import { useState, type FormEvent } from 'react';
import axios from 'axios';

interface Usuario {
    id: number;
    nome: string;
    email: string;
    cargo?: string;
}

interface UsuarioEditFormProps {
    usuario: Usuario;
    onSuccess: () => void;
    onCancel: () => void;
}

export function UsuarioEditForm({ usuario, onSuccess, onCancel }: UsuarioEditFormProps) {
    const [formData, setFormData] = useState(usuario);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            await axios.put(`http://localhost:3000/api/usuarios/${usuario.id}`, formData);
            alert('Utilizador atualizado com sucesso!');
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao atualizar utilizador.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px', marginTop: '10px' }}>
            <h4>Editando: {usuario.nome}</h4>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input type="text" placeholder="Nome" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div>
                <input type="text" placeholder="Cargo" value={formData.cargo || ''} onChange={e => setFormData({ ...formData, cargo: e.target.value })} />
            </div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
                Cancelar
            </button>
        </form>
    );
}