import { DataSource } from "typeorm";
import {  Usuario } from "./entity/Usuario";
import { Venda } from "./entity/Venda";
import { Veiculo } from "./entity/Veiculo";
import { Cliente } from "./entity/Cliente";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [Usuario, Venda, Veiculo, Cliente],
    subscribers: [],
    migrations: [],
})