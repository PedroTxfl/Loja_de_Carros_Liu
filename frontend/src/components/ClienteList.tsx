import { useState, useEffect } from 'react';
import axios from 'axios';
import { ClienteEditForm } from './ClientEditForm';
import { Table, Button } from 'react-bootstrap'; 

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
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            {editingClienteId === cliente.id ? (
                                <td colSpan={4}>
                                    <ClienteEditForm cliente={cliente} onSuccess={handleEditSuccess} onCancel={() => setEditingClienteId(null)} />
                                </td>
                            ) : (
                                <>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => setEditingClienteId(cliente.id)}>Editar</Button>
                                        <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(cliente.id)}>Deletar</Button>
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