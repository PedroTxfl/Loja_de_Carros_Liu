import { useState, useEffect } from 'react';
import axios from 'axios';
import { UsuarioEditForm } from './UsuarioEditForm';
import { Table, Button } from 'react-bootstrap'; 


interface Usuario {
    id: number;
    nome: string;
    email: string;
    cargo?: string;
}

interface UsuariosListProps {
    refreshKey: number;
    onSuccess: () => void;
}

export function UsuariosList({ refreshKey, onSuccess }: UsuariosListProps) {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/usuarios').then(res => setUsuarios(res.data));
    }, [refreshKey]);

    const handleDelete = (id: number) => {
        if (window.confirm('Tem a certeza que quer deletar este utilizador?')) {
            axios.delete(`http://localhost:3000/api/usuarios/${id}`)
                .then(() => {
                    alert('Utilizador deletado com sucesso!');
                    onSuccess();
                })
                .catch(err => {
                    console.error("Erro ao deletar utilizador:", err);
                    alert('Falha ao deletar o utilizador.');
                });
        }
    };

    const handleEditSuccess = () => {
        setEditingUserId(null);
        onSuccess();
    };

    return (
        <div>
            <h2>Lista de Utilizadores</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(user => (
                        <tr key={user.id}>
                            {editingUserId === user.id ? (
                                <td colSpan={4}>
                                    <UsuarioEditForm usuario={user} onSuccess={handleEditSuccess} onCancel={() => setEditingUserId(null)} />
                                </td>
                            ) : (
                                <>
                                    <td>{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td>{user.cargo || 'N/A'}</td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => setEditingUserId(user.id)}>Editar</Button>
                                        <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(user.id)}>Deletar</Button>
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