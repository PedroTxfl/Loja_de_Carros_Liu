import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venda } from "./Venda"; 

@Entity()
export class Veiculo {
    @PrimaryGeneratedColumn()
    id?: number; 

    @Column()
    marca?: string;

    @Column()
    modelo?: string;

    @Column("int")
    anoFabricacao?: number;

    @Column("int")
    anoModelo?: number;

    @Column()
    cor?: string;

    @Column({ unique: true, nullable: true }) 
    placa?: string;

    @Column("int", { default: 0 })
    quilometragem?: number;

    @Column("decimal", { precision: 10, scale: 2 }) 
    preco?: number;

    @Column("text", { nullable: true })
    descricao?: string; 

    @Column({ default: false }) 
    vendido?: boolean;

    @OneToMany(() => Venda, (venda) => venda.veiculo)
    vendas?: Venda[];
}