import { Repository, EntityManager } from 'typeorm';
import { Venda } from '../entity/Venda';
import { Cliente } from '../entity/Cliente';
import { Veiculo } from '../entity/Veiculo';
import { Usuario } from '../entity/Usuario';
import { AppDataSource } from '../data-source';

export interface VendaData {
    clienteId: number;
    veiculoId: number;
    vendedorId: number; 
    valorVenda: number;
    observacoes?: string;
}

export class VendaService {
  private vendaRepository: Repository<Venda>;
  private clienteRepository: Repository<Cliente>;
  private veiculoRepository: Repository<Veiculo>;
  private usuarioRepository: Repository<Usuario>;
  private entityManager: EntityManager; 

  constructor() {
    this.vendaRepository = AppDataSource.getRepository(Venda);
    this.clienteRepository = AppDataSource.getRepository(Cliente);
    this.veiculoRepository = AppDataSource.getRepository(Veiculo);
    this.usuarioRepository = AppDataSource.getRepository(Usuario);
    this.entityManager = AppDataSource.manager;
  }

  async inserir(data: VendaData): Promise<Venda> {
    if (!data.clienteId || !data.veiculoId || !data.vendedorId || data.valorVenda === undefined) {
      throw { id: 400, msg: "Campos obrigatórios (clienteId, veiculoId, vendedorId, valorVenda) não foram fornecidos." };
    }
    if (typeof data.valorVenda !== 'number' || data.valorVenda <= 0) {
        throw { id: 400, msg: "Valor da venda deve ser um número positivo." };
    }

    return await this.entityManager.transaction(async transactionalEntityManager => {
        const clienteRepo = transactionalEntityManager.getRepository(Cliente);
        const veiculoRepo = transactionalEntityManager.getRepository(Veiculo);
        const usuarioRepo = transactionalEntityManager.getRepository(Usuario);
        const vendaRepo = transactionalEntityManager.getRepository(Venda);

        const cliente = await clienteRepo.findOneBy({ id: data.clienteId });
        if (!cliente) {
            throw { id: 404, msg: `Cliente com ID ${data.clienteId} não encontrado.` };
        }

        const veiculo = await veiculoRepo.findOneBy({ id: data.veiculoId });
        if (!veiculo) {
            throw { id: 404, msg: `Veículo com ID ${data.veiculoId} não encontrado.` };
        }

        const vendedor = await usuarioRepo.findOneBy({ id: data.vendedorId });
        if (!vendedor) {
            throw { id: 404, msg: `Vendedor (Usuário) com ID ${data.vendedorId} não encontrado.` };
        }

        if (veiculo.vendido) {
            throw { id: 409, msg: `Veículo com ID ${data.veiculoId} (Placa: ${veiculo.placa || 'N/A'}) já foi vendido.` }; 
        }

        const novaVenda = vendaRepo.create({
            cliente: cliente,
            veiculo: veiculo,
            vendedor: vendedor,
            valorVenda: data.valorVenda,
            observacoes: data.observacoes,
            
        });
        const vendaSalva = await vendaRepo.save(novaVenda);

        const updateResult = await veiculoRepo.update(
            { id: data.veiculoId, vendido: false }, 
            { vendido: true }
        );

        if (updateResult.affected === 0) {
            throw { id: 409, msg: `Falha ao atualizar status do veículo ID ${data.veiculoId}. Pode ter sido vendido recentemente.` };
        }

        return vendaSalva;
    });
  }

  async listar(): Promise<Venda[]> {
    
    return await this.vendaRepository.find({
        relations: ["cliente", "veiculo", "vendedor"],
        order: { dataHora: "DESC" } 
    });
  }

  async buscarPorId(id: string): Promise<Venda> {
    if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
        throw { id: 400, msg: "ID da venda inválido. Deve ser um UUID." };
    }
    const venda = await this.vendaRepository.findOne({
        where: { id: id },
        relations: ["cliente", "veiculo", "vendedor"],
    });
    if (!venda) {
      throw { id: 404, msg: "Venda não encontrada." };
    }
    return venda;
  }

}