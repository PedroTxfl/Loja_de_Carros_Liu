// client/src/components/UsuariosList.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UsuarioEditForm } from './UsuarioEditForm'; // 1. Importar o formulário

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

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem a certeza que quer deletar este utilizador?')) {
            try {
                await axios.delete(`http://localhost:3000/api/usuarios/${id}`);
                alert('Utilizador deletado com sucesso!');
                onSuccess();
            } catch (err) {
                alert('Falha ao deletar o utilizador.');
            }
        }
    };

    const handleEditSuccess = () => {
        setEditingUserId(null); 
        onSuccess(); 
    };

    return (
        <div>
            <h2>Lista de Utilizadores</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {usuarios.map(user => (
                    <li key={user.id} style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                        {editingUserId === user.id ? (
                            <UsuarioEditForm 
                                usuario={user} 
                                onSuccess={handleEditSuccess} 
                                onCancel={() => setEditingUserId(null)} 
                            />
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>
                                    <strong>{user.nome}</strong> ({user.email}) - Cargo: {user.cargo || 'N/A'}
                                </span>
                                <div>
                                    <button onClick={() => setEditingUserId(user.id)}>Editar</button>
                                    <button onClick={() => handleDelete(user.id)} style={{ marginLeft: '10px' }}>Deletar</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}