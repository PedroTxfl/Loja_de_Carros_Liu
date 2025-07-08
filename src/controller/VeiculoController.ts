import { Request, Response, Router } from 'express';
import { VeiculoService, VeiculoData, UpdateVeiculoData } from '../services/VeiculoService';
import { upload } from '../config/multer';

const veiculoRouter = Router();
const veiculoService = new VeiculoService();

// POST /veiculos
veiculoRouter.post('/', async (req: Request, res: Response) => {
  
  const dadosVeiculo = req.body as VeiculoData; 
  try {
    const novoVeiculo = await veiculoService.inserir(dadosVeiculo);
    res.status(201).json(novoVeiculo);
  } catch (err: any) {
  
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro interno do servidor.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// GET /veiculos
veiculoRouter.get('/', async (req: Request, res: Response) => {
  try {
    const veiculos = await veiculoService.listar();
    res.status(200).json(veiculos);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro ao listar veículos.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// GET /veiculos/:id
veiculoRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID do veículo deve ser um número.' });
      return;
    }
    const veiculo = await veiculoService.buscarPorId(id);
    res.status(200).json(veiculo);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro ao buscar veículo.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// PUT /veiculos/:id
veiculoRouter.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID do veículo deve ser um número.' });
      return;
    }
    const dadosAtualizacao = req.body as UpdateVeiculoData;
    const veiculoAtualizado = await veiculoService.atualizar(id, dadosAtualizacao);
    res.status(200).json(veiculoAtualizado);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro ao atualizar veículo.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// DELETE /veiculos/:id
veiculoRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID do veículo deve ser um número.' });
      return;
    }
    const veiculoDeletado = await veiculoService.deletar(id);

    res.status(200).json(veiculoDeletado);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro ao deletar veículo.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

veiculoRouter.post('/:id/imagem', upload.single('imagem'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            res.status(400).json({ error: 'Nenhum ficheiro foi enviado.' });
            return;
        }
        const veiculoAtualizado = await veiculoService.atualizarImagem(parseInt(id), req.file.filename);
        res.status(200).json(veiculoAtualizado);
    } catch (err: any) {
        const statusCode = err.id || 500;
        const errorMessage = err.msg || 'Erro ao fazer upload da imagem.';
        res.status(statusCode).json({ error: errorMessage });
    }
});


export default veiculoRouter; 