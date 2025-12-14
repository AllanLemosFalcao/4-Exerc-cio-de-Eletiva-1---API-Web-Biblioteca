import "reflect-metadata";
import { DataSource } from "typeorm";
import { Livro } from "./entity/Livro";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // Cria as tabelas automaticamente (apenas para dev)
    logging: false,
    entities: [Livro],
    subscribers: [],
    migrations: [],
});