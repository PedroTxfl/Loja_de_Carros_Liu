import { Repository } from 'typeorm';
import { Veiculo } from '../entity/Veiculo';
import { AppDataSource } from '../data-source';  

export interface VeiculoData {
    marca: string;
    modelo: string;
    anoFabricacao: number;
    anoModelo: number;
    cor: string;
    preco: number;
    placa?: string;       
    quilometragem?: number;
    descricao?: string;
    vendido?: boolean;
}

export interface UpdateVeiculoData {
    marca?: string;
    modelo?: string;
    anoFabricacao?: number;
    anoModelo?: number;
    cor?: string;
    preco?: number;
    placa?: string;
    quilometragem?: number;
    descricao?: string;
    vendido?: boolean;
}

export class VeiculoService {
  private veiculoRepository: Repository<Veiculo>;

  constructor() {
    this.veiculoRepository = AppDataSource.getRepository(Veiculo);
  }

  async inserir(data: VeiculoData): Promise<Veiculo> {
    if (!data.marca || !data.modelo || !data.anoFabricacao || !data.anoModelo || !data.cor || data.preco === undefined) {
        throw { id: 400, msg: "Campos obrigatórios (marca, modelo, anoFabricacao, anoModelo, cor, preco) não foram fornecidos ou são inválidos." };
    }
    
    if (typeof data.marca !== 'string' ||
        typeof data.modelo !== 'string' ||
        typeof data.anoFabricacao !== 'number' ||
        typeof data.anoModelo !== 'number' ||
        typeof data.cor !== 'string' ||
        typeof data.preco !== 'number') {
        throw { id: 400, msg: "Tipos de dados inválidos para os campos fornecidos." };
    }
    if (data.preco < 0) {
        throw { id: 400, msg: "Preço não pode ser negativo." };
    }

    if (data.placa) {
      const veiculoExistenteComPlaca = await this.veiculoRepository.findOneBy({ placa: data.placa });
      if (veiculoExistenteComPlaca) {
        throw { id: 409, msg: `Veículo com placa ${data.placa} já cadastrado.` }; 
      }
    }

    const novoVeiculo = this.veiculoRepository.create(data);
    return await this.veiculoRepository.save(novoVeiculo);
  }

  async listar(): Promise<Veiculo[]> {
    return await this.veiculoRepository.find();
  }

  async buscarPorId(id: number): Promise<Veiculo> {
    if (isNaN(id) || id <= 0) {
        throw { id: 400, msg: "ID inválido fornecido." };
    }
    const veiculo = await this.veiculoRepository.findOneBy({ id: id });
    if (!veiculo) {
      throw { id: 404, msg: "Veículo não encontrado." };
    }
    return veiculo;
  }

  async atualizar(id: number, data: UpdateVeiculoData): Promise<Veiculo> {
    if (isNaN(id) || id <= 0) {
        throw { id: 400, msg: "ID inválido fornecido para atualização." };
    }

    const veiculoParaAtualizar = await this.veiculoRepository.findOneBy({ id: id });
    if (!veiculoParaAtualizar) {
      throw { id: 404, msg: "Veículo não encontrado para atualização." };
    }

    if (data.placa && data.placa !== veiculoParaAtualizar.placa) {
      const veiculoExistenteComPlaca = await this.veiculoRepository.findOneBy({ placa: data.placa });
      if (veiculoExistenteComPlaca && veiculoExistenteComPlaca.id !== id) {
        throw { id: 409, msg: `Já existe outro veículo com a placa ${data.placa}.` };
      }
    }
    
    if (data.hasOwnProperty('preco') && (typeof data.preco !== 'number' || data.preco < 0)) {
        throw { id: 400, msg: "Se fornecido, o preço deve ser um número válido e não negativo." };
    }

    Object.assign(veiculoParaAtualizar, data); 

    return await this.veiculoRepository.save(veiculoParaAtualizar);
  }

  async deletar(id: number): Promise<Veiculo> { 
    if (isNaN(id) || id <= 0) {
        throw { id: 400, msg: "ID inválido fornecido para deleção." };
    }
    const veiculoParaDeletar = await this.veiculoRepository.findOneBy({ id: id });
    if (!veiculoParaDeletar) {
      throw { id: 404, msg: "Veículo não encontrado para deleção." };
    }
    await this.veiculoRepository.remove(veiculoParaDeletar);
    return veiculoParaDeletar; 
  }

  async atualizarImagem(id: number, imagemUrl: string): Promise<Veiculo> {
        const veiculo = await this.buscarPorId(id);
        veiculo.imagemUrl = imagemUrl;
        return await this.veiculoRepository.save(veiculo);
    }
}