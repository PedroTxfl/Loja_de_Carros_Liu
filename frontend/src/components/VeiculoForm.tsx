import { useState, type FormEvent, type ChangeEvent } from 'react';
import axios from 'axios';

interface VeiculoFormProps {
    onSuccess: () => void;
}

export function VeiculoForm({ onSuccess }: VeiculoFormProps) {
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        anoFabricacao: new Date().getFullYear(),
        anoModelo: new Date().getFullYear(),
        cor: '',
        preco: 0,
        placa: '',
    });

    const [imagem, setImagem] = useState<File | null>(null);

    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImagem(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/api/veiculos', formData);
            const novoVeiculoId = response.data.id;

            if (imagem) {
                const imageFormData = new FormData();
                imageFormData.append('imagem', imagem);

                await axios.post(`http://localhost:3000/api/veiculos/${novoVeiculoId}/imagem`, imageFormData);
            }

            alert('Veículo registado com sucesso!');
            onSuccess(); /

        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Erro ao registar veículo.';
            setError(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registar Novo Veículo</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

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
                <input type="text" placeholder="Placa" value={formData.placa} onChange={e => setFormData({ ...formData, placa: e.target.value })} />
            </div>
             <div>
                <input type="number" step="0.01" placeholder="Preço" value={formData.preco} onChange={e => setFormData({ ...formData, preco: parseFloat(e.target.value) })} required />
            </div>

            <div>
                <label>Imagem do Veículo:</label>
                <input type="file" name="imagem" onChange={handleFileChange} />
            </div>

            <button type="submit">Registar</button>
        </form>
    );
}