import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venda } from "./Venda"; 

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id?: number; 

    @Column()
    nome?: string;

    @Column({ unique: true })
    email?: string; 

    @Column()
    senha?: string; 

    @Column({ nullable: true })
    cargo?: string; 

    @OneToMany(() => Venda, (venda) => venda.vendedor)
    vendasEfetuadas?: Venda[];
}