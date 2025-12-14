import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Livro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    autor: string;

    @Column({ unique: true }) // ISBN
    isbn: string;

    @Column()
    anoPublicacao: number;

    @Column()
    disponivel: boolean;
}