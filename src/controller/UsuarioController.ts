import { Request, Response, Router } from 'express';
import { UsuarioService, UsuarioData, UpdateUsuarioData } from '../services/UsuarioService';

const usuarioRouter = Router();
const usuarioService = new UsuarioService();

// POST /usuarios 
usuarioRouter.post('/', async (req: Request, res: Response) => {
  const dadosUsuario = req.body as UsuarioData;
  try {
    const novoUsuario = await usuarioService.inserir(dadosUsuario);

    const { senha, ...usuarioSemSenha } = novoUsuario;
    res.status(201).json(usuarioSemSenha);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro interno do servidor ao inserir usuário.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// POST /usuarios/login 
usuarioRouter.post('/login', async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    try {
       
        const usuarioLogado = await usuarioService.verificarLogin(email, senha);
        const { senha: _, ...usuarioSemSenhaParaResposta } = usuarioLogado;
        res.status(200).json({ message: "Login bem-sucedido (sem token nesta versão)", usuario: usuarioSemSenhaParaResposta });
    } catch (err: any) {
        const statusCode = err.id || 401; 
        const errorMessage = err.msg || 'Falha no login.';
        res.status(statusCode).json({ error: errorMessage });
    }
});

// GET /usuarios
usuarioRouter.get('/', async (req: Request, res: Response) => {
  try {
    const usuarios = await usuarioService.listar();
    const usuariosSemSenha = usuarios.map(u => {
        const { senha, ...resto } = u;
        return resto;
    });
    res.status(200).json(usuariosSemSenha);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro ao listar usuários.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// GET /usuarios/:id
usuarioRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID do usuário deve ser um número.' });
      return;
    }
    const usuario = await usuarioService.buscarPorId(id);
    if (!usuario) {
      res.status(404).json({ error: 'Usuário não encontrado.' });
      return;
    }
    const { senha, ...usuarioSemSenha } = usuario;
    res.status(200).json(usuarioSemSenha);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro ao buscar usuário.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// PUT /usuarios/:id
usuarioRouter.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID do usuário deve ser um número.' });
      return;
    }
    const dadosAtualizacao = req.body as UpdateUsuarioData;
    const usuarioAtualizado = await usuarioService.atualizar(id, dadosAtualizacao);
    const { senha, ...usuarioSemSenha } = usuarioAtualizado;
    res.status(200).json(usuarioSemSenha);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro ao atualizar usuário.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// DELETE /usuarios/:id
usuarioRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID do usuário deve ser um número.' });
      return;
    }
    await usuarioService.deletar(id);
    res.status(204).send();
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro ao deletar usuário.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

export default usuarioRouter;