import { Repository, FindOptionsWhere } from 'typeorm';
import { Cliente } from '../entity/Cliente'; 
import { AppDataSource } from '../data-source'; 


export interface ClienteData {
    nome: string;
    email: string;
    cpf: string;
    telefone?: string;
}

export interface UpdateClienteData {
    nome?: string;
    email?: string;
    cpf?: string; 
    telefone?: string;
}

export class ClienteService {
  private clienteRepository: Repository<Cliente>;

  constructor() {
    this.clienteRepository = AppDataSource.getRepository(Cliente);
  }

  async inserir(data: ClienteData): Promise<Cliente> {
    if (!data.nome || !data.email || !data.cpf) {
      throw { id: 400, msg: "Campos obrigatórios (nome, email, cpf) não foram fornecidos." };
    }

    if (typeof data.nome !== 'string' || typeof data.email !== 'string' || typeof data.cpf !== 'string') {
      throw { id: 400, msg: "Tipos de dados inválidos para nome, email ou cpf." };
    }
    if (!data.email.includes('@')) {
        throw { id: 400, msg: "Formato de email inválido." };
    }
    if (!/^\d{11}$/.test(data.cpf.replace(/\D/g, ''))) { 
        throw { id: 400, msg: "Formato de CPF inválido. Deve conter 11 dígitos." };
    }
    data.cpf = data.cpf.replace(/\D/g, ''); 


    const [clienteExistenteComEmail, clienteExistenteComCpf] = await Promise.all([
        this.clienteRepository.findOneBy({ email: data.email }),
        this.clienteRepository.findOneBy({ cpf: data.cpf })
    ]);

    if (clienteExistenteComEmail) {
      throw { id: 409, msg: `Cliente com email ${data.email} já cadastrado.` }; 
    }
    if (clienteExistenteComCpf) {
      throw { id: 409, msg: `Cliente com CPF ${data.cpf} já cadastrado.` };
    }

    const novoCliente = this.clienteRepository.create(data);
    return await this.clienteRepository.save(novoCliente);
  }

  async listar(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    if (isNaN(id) || id <= 0) {
        throw { id: 400, msg: "ID inválido fornecido." };
    }
    const cliente = await this.clienteRepository.findOneBy({ id: id });
    if (!cliente) {
      throw { id: 404, msg: "Cliente não encontrado." };
    }
    return cliente;
  }

  async atualizar(id: number, data: UpdateClienteData): Promise<Cliente> {
    if (isNaN(id) || id <= 0) {
        throw { id: 400, msg: "ID inválido fornecido para atualização." };
    }

    const clienteParaAtualizar = await this.clienteRepository.findOneBy({ id: id });
    if (!clienteParaAtualizar) {
      throw { id: 404, msg: "Cliente não encontrado para atualização." };
    }

   
    if (data.email && data.email !== clienteParaAtualizar.email) {
      const clienteExistenteComEmail = await this.clienteRepository.findOneBy({ email: data.email });
      if (clienteExistenteComEmail && clienteExistenteComEmail.id !== id) {
        throw { id: 409, msg: `Já existe outro cliente com o email ${data.email}.` };
      }
    }
    if (data.cpf) {
        const cpfLimpo = data.cpf.replace(/\D/g, '');
        if (!/^\d{11}$/.test(cpfLimpo)) {
            throw { id: 400, msg: "Formato de CPF inválido para atualização. Deve conter 11 dígitos." };
        }
        if (cpfLimpo !== clienteParaAtualizar.cpf) {
            const clienteExistenteComCpf = await this.clienteRepository.findOneBy({ cpf: cpfLimpo });
            if (clienteExistenteComCpf && clienteExistenteComCpf.id !== id) {
                throw { id: 409, msg: `Já existe outro cliente com o CPF ${data.cpf}.` };
            }
            data.cpf = cpfLimpo; 
        } else {
            delete data.cpf; 
        }
    }

    Object.assign(clienteParaAtualizar, data);

    return await this.clienteRepository.save(clienteParaAtualizar);
  }

  async deletar(id: number): Promise<Cliente> {
    if (isNaN(id) || id <= 0) {
        throw { id: 400, msg: "ID inválido fornecido para deleção." };
    }
    const clienteParaDeletar = await this.clienteRepository.findOneBy({ id: id });
    if (!clienteParaDeletar) {
      throw { id: 404, msg: "Cliente não encontrado para deleção." };
    }

    await this.clienteRepository.remove(clienteParaDeletar);
    return clienteParaDeletar;
  }
}