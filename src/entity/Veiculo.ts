import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venda } from "./Venda"; // Supondo que Venda.ts existirá

@Entity()
export class Veiculo {
    @PrimaryGeneratedColumn()
    id?: number; //

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

    @Column({ unique: true, nullable: true }) // Placa pode ser nula para carros 0km e deve ser única
    placa?: string;

    @Column("int", { default: 0 })
    quilometragem?: number;

    @Column("decimal", { precision: 10, scale: 2 }) 
    preco?: number;

    @Column("text", { nullable: true })
    descricao?: string; 

    @Column({ default: false }) 
    vendido?: boolean;

    // Relação com Venda: Um veículo pode estar associado a múltiplas propostas/histórico de vendas, mas apenas uma venda finalizada por vez.

    @OneToMany(() => Venda, (venda) => venda.veiculo)
    vendas?: Venda[];
}