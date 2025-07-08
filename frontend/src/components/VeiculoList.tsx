import { useState, useEffect } from 'react';
import axios from 'axios';
import { VeiculoEditForm } from './VeiculoEditForm'; 

interface Veiculo {
    id: number;
    marca: string;
    modelo: string;
    anoFabricacao: number;
    anoModelo: number;
    cor: string;
    preco: number;
    placa?: string;
    vendido: boolean;
}
interface VeiculosListProps {
    refreshKey: number;
    onSuccess: () => void;
}

export function VeiculosList({ refreshKey, onSuccess }: VeiculosListProps) {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [editingVeiculoId, setEditingVeiculoId] = useState<number | null>(null);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/api/veiculos')
            .then(response => {
                setVeiculos(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Falha ao carregar os veículos.');
                setLoading(false);
                console.error(err);
            });
    }, [refreshKey]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja deletar este veículo?')) {
            try {
                await axios.delete(`http://localhost:3000/api/veiculos/${id}`);
                alert('Veículo deletado com sucesso!');
                onSuccess();
            } catch (err) {
                alert('Falha ao deletar o veículo.');
                console.error(err);
            }
        }
    };

    const handleEditSuccess = () => {
        setEditingVeiculoId(null); 
        onSuccess(); 
    };

    const handleCancelEdit = () => {
        setEditingVeiculoId(null); 
    };

    if (loading) return <p>Carregando veículos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Lista de Veículos</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {veiculos.map(veiculo => (
                    <li key={veiculo.id} style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                        {editingVeiculoId === veiculo.id ? (
                            <VeiculoEditForm 
                                veiculo={veiculo} 
                                onSuccess={handleEditSuccess} 
                                onCancel={handleCancelEdit} 
                            />
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>
                                    {veiculo.marca} {veiculo.modelo} ({veiculo.anoFabricacao}) - R$ {veiculo.preco}
                                </span>
                                <div>
                                    <button onClick={() => setEditingVeiculoId(veiculo.id)} style={{ marginLeft: '10px' }}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(veiculo.id)} style={{ marginLeft: '10px' }}>
                                        Deletar
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}