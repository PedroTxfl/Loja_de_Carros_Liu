import * as express from 'express';
import veiculoRouter from './controller/VeiculoController';
import clienteRouter from './controller/ClienteController';
import usuarioRouter from './controller/UsuarioController';
import vendaRouter from './controller/VendaController';
import * as cors from 'cors';


const app = express();


app.use(cors());
app.use(express.json()); 


app.use('/api/veiculos', veiculoRouter);
app.use('/api/clientes', clienteRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/vendas', vendaRouter);

export default app;