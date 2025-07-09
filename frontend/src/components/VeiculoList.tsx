import { useState, useEffect } from 'react';
import axios from 'axios';
import { VeiculoEditForm } from './VeiculoEditForm';
import { Table, Button } from 'react-bootstrap';

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
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Ano</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {veiculos.map(veiculo => (
                        <tr key={veiculo.id}>
                            {editingVeiculoId === veiculo.id ? (
                                <td colSpan={5}>
                                    <VeiculoEditForm veiculo={veiculo} onSuccess={handleEditSuccess} onCancel={handleCancelEdit} />
                                </td>
                            ) : (
                                <>
                                    <td>{veiculo.marca}</td>
                                    <td>{veiculo.modelo}</td>
                                    <td>{veiculo.anoFabricacao}</td>
                                    <td>R$ {veiculo.preco}</td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => setEditingVeiculoId(veiculo.id)}>Editar</Button>
                                        <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(veiculo.id)}>Deletar</Button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
