// src/app.ts
import * as express from 'express';
// Importe os routers que você criou e exportou:
import veiculoRouter from './controller/VeiculoController';
import clienteRouter from './controller/ClienteController';
import usuarioRouter from './controller/UsuarioController';
import vendaRouter from './controller/VendaController';

const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Use os routers importados, cada um com seu prefixo de rota:
app.use('/api/veiculos', veiculoRouter);
app.use('/api/clientes', clienteRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/vendas', vendaRouter);

// Seu middleware de tratamento de erro global viria aqui (se você tiver um)
// app.use((err, req, res, next) => { ... });

export default app;