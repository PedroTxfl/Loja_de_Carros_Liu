import { useState, useEffect } from 'react';
import axios from 'axios';
import { ClienteEditForm } from './ClientEditForm';

interface Cliente {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone?: string;
}

interface ClientesListProps {
    refreshKey: number;
    onSuccess: () => void;
}

export function ClientesList({ refreshKey, onSuccess }: ClientesListProps) {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [editingClienteId, setEditingClienteId] = useState<number | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/clientes')
            .then(response => {
                setClientes(response.data);
            })
            .catch(err => {
                console.error("Falha ao carregar os clientes.", err);
                alert("Não foi possível carregar a lista de clientes.");
            });
    }, [refreshKey]);

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
            axios.delete(`http://localhost:3000/api/clientes/${id}`)
                .then(() => {
                    alert('Cliente deletado com sucesso!');
                    onSuccess();
                })
                .catch(err => {
                    console.error("Erro ao deletar cliente:", err);
                    alert('Falha ao deletar o cliente.');
                });
        }
    };

    const handleEditSuccess = () => {
        setEditingClienteId(null);
        onSuccess();
    };

    return (
        <div>
            <h2>Lista de Clientes</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {clientes.map(cliente => (
                    <li key={cliente.id} style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                        {editingClienteId === cliente.id ? (
                            <ClienteEditForm cliente={cliente} onSuccess={handleEditSuccess} onCancel={() => setEditingClienteId(null)} />
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>
                                    <strong>{cliente.nome}</strong> ({cliente.email})
                                </span>
                                <div>
                                    <button onClick={() => setEditingClienteId(cliente.id)}>Editar</button>
                                    <button onClick={() => handleDelete(cliente.id)} style={{ marginLeft: '10px' }}>Deletar</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}