import { Request, Response, Router } from "express";
import {
  ClienteService,
  ClienteData,
  UpdateClienteData,
} from "../services/ClienteService";

const clienteRouter = Router();
const clienteService = new ClienteService();

// POST /clientes
clienteRouter.post("/", async (req: Request, res: Response) => {
  const dadosCliente = req.body as ClienteData;
  try {
    const novoCliente = await clienteService.inserir(dadosCliente);
    res.status(201).json(novoCliente);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage =
      err.msg || "Erro interno do servidor ao inserir cliente.";
    res.status(statusCode).json({ error: errorMessage });
  }
});

// GET /clientes
clienteRouter.get("/", async (req: Request, res: Response) => {
  try {
    const clientes = await clienteService.listar();
    res.status(200).json(clientes);
  } catch (err: any) {
    const statusCode = err.id || 500;
    const errorMessage = err.msg || "Erro ao listar clientes.";
    res.status(statusCode).json({ error: errorMessage });
  }
});

// GET /clientes/:id
clienteRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "ID do cliente deve ser um número." });
        return;
      }
      const cliente = await clienteService.buscarPorId(id);
      res.status(200).json(cliente);
    } catch (err: any) {
      const statusCode = err.id || 500;
      const errorMessage = err.msg || "Erro ao buscar cliente.";
      res.status(statusCode).json({ error: errorMessage });
    }
  }
);

// PUT /clientes/:id
clienteRouter.put(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "ID do cliente deve ser um número." });
        return;
      }
      const dadosAtualizacao = req.body as UpdateClienteData;
      const clienteAtualizado = await clienteService.atualizar(
        id,
        dadosAtualizacao
      );
      res.status(200).json(clienteAtualizado);
    } catch (err: any) {
      const statusCode = err.id || 500;
      const errorMessage = err.msg || "Erro ao atualizar cliente.";
      res.status(statusCode).json({ error: errorMessage });
    }
  }
);

// DELETE /clientes/:id
clienteRouter.delete(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "ID do cliente deve ser um número." });
        return;
      }
      const clienteDeletado = await clienteService.deletar(id);
      res.status(200).json(clienteDeletado);
    } catch (err: any) {
      const statusCode = err.id || 500;
      const errorMessage = err.msg || "Erro ao deletar cliente.";
      res.status(statusCode).json({ error: errorMessage });
    }
  }
);

export default clienteRouter;
