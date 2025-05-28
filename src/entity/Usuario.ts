import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venda } from "./Venda"; // Supondo que Venda.ts existirá

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id?: number; //

    @Column()
    nome?: string;

    @Column({ unique: true })
    email?: string; //

    @Column()
    senha?: string; // Lembre-se de tratar o hashing da senha na lógica da aplicação

    @Column({ nullable: true })
    cargo?: string; // Ex: "Vendedor", "Gerente"

    @OneToMany(() => Venda, (venda) => venda.vendedor)
    vendasEfetuadas?: Venda[];
}