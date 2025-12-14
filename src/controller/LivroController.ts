import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Livro } from "../entity/Livro";

export class LivroController {
    // Repositório direto (Camada de Persistência)
    private livroRepository = AppDataSource.getRepository(Livro);

    // CRIAÇÃO (POST)
    async create(req: Request, res: Response) {
        try {
            const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

            // Lógica de Negócio: Validação básica
            if (!titulo || !autor || !isbn) {
                return res.status(400).json({ message: "Campos obrigatórios: titulo, autor, isbn." });
            }

            const novoLivro = this.livroRepository.create({
                titulo, autor, isbn, anoPublicacao, disponivel
            });

            await this.livroRepository.save(novoLivro);
            return res.status(201).json(novoLivro);

        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar livro", error });
        }
    }

    // LEITURA TODOS (GET)
    async getAll(req: Request, res: Response) {
        try {
            const livros = await this.livroRepository.find();
            return res.json(livros);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar livros" });
        }
    }

    // LEITURA POR ID (GET)
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const livro = await this.livroRepository.findOneBy({ id: Number(id) });

            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }

            return res.json(livro);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar livro" });
        }
    }

    // ATUALIZAR (PUT/PATCH)
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

            const livro = await this.livroRepository.findOneBy({ id: Number(id) });

            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado para atualização" });
            }

            // Atualiza os campos
            livro.titulo = titulo ?? livro.titulo;
            livro.autor = autor ?? livro.autor;
            livro.isbn = isbn ?? livro.isbn;
            livro.anoPublicacao = anoPublicacao ?? livro.anoPublicacao;
            livro.disponivel = disponivel ?? livro.disponivel;

            await this.livroRepository.save(livro);
            return res.json({ message: "Livro atualizado com sucesso", livro });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar livro" });
        }
    }

    // EXCLUIR (DELETE)
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await this.livroRepository.delete(id);

            if (result.affected === 0) {
                return res.status(404).json({ message: "Livro não encontrado para exclusão" });
            }

            return res.status(204).send(); // No Content
        } catch (error) {
            return res.status(500).json({ message: "Erro ao excluir livro" });
        }
    }
}