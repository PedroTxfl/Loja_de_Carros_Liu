// client/src/components/UsuarioForm.tsx
import { useState, type FormEvent } from 'react';
import axios from 'axios';

interface UsuarioFormProps {
    onSuccess: () => void;
}

export function UsuarioForm({ onSuccess }: UsuarioFormProps) {
    const [formData, setFormData] = useState({ nome: '', email: '', senha: '', cargo: '' });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            await axios.post('http://localhost:3000/api/usuarios', formData);
            alert('Utilizador registado com sucesso!');
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao registar utilizador.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Registar Novo Utilizador</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input type="text" placeholder="Nome" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div>
                <input type="password" placeholder="Senha" value={formData.senha} onChange={e => setFormData({ ...formData, senha: e.target.value })} required />
                <input type="text" placeholder="Cargo" value={formData.cargo} onChange={e => setFormData({ ...formData, cargo: e.target.value })} />
            </div>
            <button type="submit">Registar Utilizador</button>
        </form>
    );
}