import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

const app = express();
app.use(express.json());

// Inicializa a conexão com o banco antes de subir o servidor
AppDataSource.initialize().then(() => {
    console.log("Banco de dados conectado com sucesso!");

    // Prefixo /api
    app.use("/api", routes);

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000: http://localhost:3000/api/livros");
    });

}).catch(error => console.log("Erro ao conectar no banco: ", error));