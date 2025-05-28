import { Request, Response, Router } from 'express';
import { VendaService, VendaData } from '../services/VendaService'; 

const vendaRouter = Router();
const vendaService = new VendaService();

// POST /vendas
vendaRouter.post('/', async (req: Request, res: Response) => {
  const dadosVenda = req.body as VendaData;
  try {
    const novaVenda = await vendaService.inserir(dadosVenda);
    res.status(201).json(novaVenda);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro interno do servidor ao registrar venda.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// GET /vendas
vendaRouter.get('/', async (req: Request, res: Response) => {
  try {
    const vendas = await vendaService.listar();
    res.status(200).json(vendas);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro ao listar vendas.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

// GET /vendas/:id
vendaRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id; 
    const venda = await vendaService.buscarPorId(id);
    res.status(200).json(venda);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || 'Erro ao buscar venda.';
    res.status(statusCode).json({ error: errorMessage });
  }
});

export default vendaRouter;