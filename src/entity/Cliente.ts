import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venda } from "./Venda"; // Supondo que Venda.ts existirá

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome?: string; 

    @Column({ unique: true }) 
    email?: string; 

    @Column({ nullable: true })
    telefone?: string;

    @Column({ unique: true }) 
    cpf?: string;

    @OneToMany(() => Venda, (venda) => venda.cliente)
    vendas?: Venda[];
}