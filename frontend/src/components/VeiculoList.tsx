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
    const [editingVeiculoId, setEditingVeiculoId] = useState<number | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/veiculos')
            .then(response => {
                setVeiculos(response.data);
            })
            .catch(err => {
                console.error("Falha ao carregar os veículos.", err);
                alert("Não foi possível carregar a lista de veículos.");
            });
    }, [refreshKey]);

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja deletar este veículo?')) {
            axios.delete(`http://localhost:3000/api/veiculos/${id}`)
                .then(() => {
                    alert('Veículo deletado com sucesso!');
                    onSuccess();
                })
                .catch(err => {
                    console.error("Erro ao deletar veículo:", err);
                    alert('Falha ao deletar o veículo.');
                });
        }
    };

    const handleEditSuccess = () => {
        setEditingVeiculoId(null);
        onSuccess();
    };

    const handleCancelEdit = () => {
        setEditingVeiculoId(null);
    };

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