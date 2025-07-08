import { useState, type FormEvent } from 'react';
import axios from 'axios';

interface Veiculo {
    id: number;
    marca: string;
    modelo: string;
    anoFabricacao: number;
    anoModelo: number;
    cor: string;
    preco: number;
    placa?: string;
}

interface VeiculoEditFormProps {
    veiculo: Veiculo;
    onSuccess: () => void; 
    onCancel: () => void;  
}

export function VeiculoEditForm({ veiculo, onSuccess, onCancel }: VeiculoEditFormProps) {
    const [formData, setFormData] = useState(veiculo);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            await axios.put(`http://localhost:3000/api/veiculos/${veiculo.id}`, formData);
            alert('Veículo atualizado com sucesso!');
            onSuccess(); 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Erro ao atualizar veículo.';
            setError(errorMessage);
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px', marginTop: '10px' }}>
            <h4>Editando: {veiculo.marca} {veiculo.modelo}</h4>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input
                    type="text"
                    placeholder="Marca"
                    value={formData.marca}
                    onChange={e => setFormData({ ...formData, marca: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Modelo"
                    value={formData.modelo}
                    onChange={e => setFormData({ ...formData, modelo: e.target.value })}
                    required
                />
            </div>
            <div>
                 <input
                    type="number"
                    placeholder="Ano de Fabricação"
                    value={formData.anoFabricacao}
                    onChange={e => setFormData({ ...formData, anoFabricacao: parseInt(e.target.value) })}
                    required
                />
                <input
                    type="number"
                    placeholder="Ano do Modelo"
                    value={formData.anoModelo}
                    onChange={e => setFormData({ ...formData, anoModelo: parseInt(e.target.value) })}
                    required
                />
            </div>
            <div>
               <input
                    type="text"
                    placeholder="Cor"
                    value={formData.cor}
                    onChange={e => setFormData({ ...formData, cor: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Placa"
                    value={formData.placa || ''}
                    onChange={e => setFormData({ ...formData, placa: e.target.value })}
                />
            </div>
            <div>
                <input
                    type="number"
                    step="0.01"
                    placeholder="Preço"
                    value={formData.preco}
                    onChange={e => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                    required
                />
            </div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
                Cancelar
            </button>
        </form>
    );
}