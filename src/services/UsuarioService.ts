import { Repository } from 'typeorm';
import { Usuario } from '../entity/Usuario'; 
import { AppDataSource } from '../data-source'; 


export interface UsuarioData {
    nome: string;
    email: string;
    senha: string; 
    cargo?: string;
}


export interface UpdateUsuarioData {
    nome?: string;
    email?: string;
    senha?: string; 
    cargo?: string;
}

export class UsuarioService {
  private usuarioRepository: Repository<Usuario>;

  constructor() {
    this.usuarioRepository = AppDataSource.getRepository(Usuario);
  }

  async inserir(data: UsuarioData): Promise<Usuario> {
    if (!data.nome || !data.email || !data.senha) {
      throw { id: 400, msg: "Campos obrigatórios (nome, email, senha) não foram fornecidos." };
    }
    if (typeof data.nome !== 'string' || typeof data.email !== 'string' || typeof data.senha !== 'string') {
        throw { id: 400, msg: "Tipos de dados inválidos para nome, email ou senha." };
    }
    if (!data.email.includes('@')) {
        throw { id: 400, msg: "Formato de email inválido." };
    }

    const usuarioExistenteComEmail = await this.usuarioRepository.findOneBy({ email: data.email });
    if (usuarioExistenteComEmail) {
      throw { id: 409, msg: `Usuário com email ${data.email} já cadastrado.` };
    }

    const novoUsuario = this.usuarioRepository.create(data);
    return await this.usuarioRepository.save(novoUsuario);
  }

  async listar(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async buscarPorId(id: number): Promise<Usuario> {
    if (isNaN(id) || id <= 0) {
        throw { id: 400, msg: "ID inválido fornecido." };
    }
    const usuario = await this.usuarioRepository.findOneBy({ id: id });
    if (!usuario) {
      throw { id: 404, msg: "Usuário não encontrado." };
    }
    return usuario;
  }

  async atualizar(id: number, data: UpdateUsuarioData): Promise<Usuario> {
    if (isNaN(id) || id <= 0) {
        throw { id: 400, msg: "ID inválido fornecido para atualização." };
    }
    const usuarioParaAtualizar = await this.usuarioRepository.findOneBy({ id: id });
    if (!usuarioParaAtualizar) {
      throw { id: 404, msg: "Usuário não encontrado para atualização." };
    }

    if (data.email && data.email !== usuarioParaAtualizar.email) {
      const usuarioExistenteComEmail = await this.usuarioRepository.findOneBy({ email: data.email });
      if (usuarioExistenteComEmail && usuarioExistenteComEmail.id !== id) {
        throw { id: 409, msg: `Já existe outro usuário com o email ${data.email}.` };
      }
    }

    Object.assign(usuarioParaAtualizar, data);
    return await this.usuarioRepository.save(usuarioParaAtualizar);
  }

  async deletar(id: number): Promise<Usuario> {
    if (isNaN(id) || id <= 0) {
        throw { id: 400, msg: "ID inválido fornecido para deleção." };
    }
    const usuarioParaDeletar = await this.usuarioRepository.findOneBy({ id: id });
    if (!usuarioParaDeletar) {
      throw { id: 404, msg: "Usuário não encontrado para deleção." };
    }
    await this.usuarioRepository.remove(usuarioParaDeletar);
    return usuarioParaDeletar;
  }

  async verificarLogin(email: string, senhaInput: string): Promise<Usuario | null> {
    if (!email || !senhaInput) {
        throw { id: 400, msg: "Email e senha são obrigatórios para login." };
    }
    const usuario = await this.usuarioRepository.findOne({ where: { email } }); 
    if (!usuario) {
        throw { id: 401, msg: "Usuário não encontrado ou credenciais inválidas." }; 
    }
    
    if (usuario.senha !== senhaInput) {
        throw { id: 401, msg: "Usuário não encontrado ou credenciais inválidas." };
    }
    return usuario;
  }
}