import { useState, type FormEvent, type ChangeEvent } from 'react';
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
    const [imagem, setImagem] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImagem(event.target.files[0]);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        axios.put(`http://localhost:3000/api/veiculos/${veiculo.id}`, formData)
            .then(() => {
                if (imagem) {
                    const imageFormData = new FormData();
                    imageFormData.append('imagem', imagem);
                    return axios.post(`http://localhost:3000/api/veiculos/${veiculo.id}/imagem`, imageFormData);
                }
            })
            .then(() => {
                alert('Veículo atualizado com sucesso!');
                onSuccess();
            })
            .catch(err => {
                console.error("Erro ao atualizar veículo:", err);
                const errorMessage = err.response?.data?.error || 'Ocorreu uma falha ao atualizar o veículo.';
                alert(errorMessage);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px', marginTop: '10px' }}>
            <h4>Editando: {veiculo.marca} {veiculo.modelo}</h4>

            <div>
                <input type="text" placeholder="Marca" value={formData.marca} onChange={e => setFormData({ ...formData, marca: e.target.value })} required />
                <input type="text" placeholder="Modelo" value={formData.modelo} onChange={e => setFormData({ ...formData, modelo: e.target.value })} required />
            </div>
            <div>
                <input type="number" placeholder="Ano de Fabricação" value={formData.anoFabricacao} onChange={e => setFormData({ ...formData, anoFabricacao: parseInt(e.target.value) })} required />
                <input type="number" placeholder="Ano do Modelo" value={formData.anoModelo} onChange={e => setFormData({ ...formData, anoModelo: parseInt(e.target.value) })} required />
            </div>
            <div>
                <input type="text" placeholder="Cor" value={formData.cor} onChange={e => setFormData({ ...formData, cor: e.target.value })} required />
                <input type="text" placeholder="Placa" value={formData.placa || ''} onChange={e => setFormData({ ...formData, placa: e.target.value })} />
            </div>
            <div>
                <input type="number" step="0.01" placeholder="Preço" value={formData.preco} onChange={e => setFormData({ ...formData, preco: parseFloat(e.target.value) })} required />
            </div>

            <div>
                <label>Alterar Imagem:</label>
                <input type="file" name="imagem" onChange={handleFileChange} />
            </div>

            <button type="submit">Salvar</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
                Cancelar
            </button>
        </form>
    );
}