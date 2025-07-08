// client/src/components/ClientesList.tsx
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingClienteId, setEditingClienteId] = useState<number | null>(null);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/api/clientes')
            .then(response => {
                setClientes(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Falha ao carregar os clientes.');
                setLoading(false);
            });
    }, [refreshKey]); 

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
            try {
                await axios.delete(`http://localhost:3000/api/clientes/${id}`);
                alert('Cliente deletado com sucesso!');
                onSuccess();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                alert('Falha ao deletar o cliente.');
            }
        }
    };

    const handleEditSuccess = () => {
        setEditingClienteId(null);
        onSuccess();
    };

    if (loading) return <p>Carregando clientes...</p>;
    if (error) return <p>{error}</p>;

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