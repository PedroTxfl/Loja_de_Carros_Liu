import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Veiculo } from "./Veiculo";
import { Usuario } from "./Usuario";

@Entity()
export class Venda {
    @PrimaryGeneratedColumn() 
    id?: string;

    @Column('timestamp', { default: () => "CURRENT_TIMESTAMP" })
    dataHora?: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.vendas)
    cliente?: Cliente; 

    @ManyToOne(() => Veiculo, (veiculo) => veiculo.vendas)
    veiculo?: Veiculo;

    @ManyToOne(() => Usuario, (usuario) => usuario.vendasEfetuadas)
    vendedor?: Usuario; 

    @Column("decimal", { precision: 10, scale: 2 })
    valorVenda?: number;

    @Column("text", { nullable: true })
    observacoes?: string;
}