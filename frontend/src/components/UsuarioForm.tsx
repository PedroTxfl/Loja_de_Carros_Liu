import { useState, type FormEvent } from 'react';
import axios from 'axios';

interface UsuarioFormProps {
    onSuccess: () => void;
}

export function UsuarioForm({ onSuccess }: UsuarioFormProps) {
    const [formData, setFormData] = useState({ nome: '', email: '', senha: '', cargo: '' });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        axios.post('http://localhost:3000/api/usuarios', formData)
            .then(() => {
                alert('Utilizador registado com sucesso!');
                onSuccess();
            })
            .catch(err => {
                console.error("Erro ao registar utilizador:", err);
                const errorMessage = err.response?.data?.error || 'Ocorreu uma falha ao registar o utilizador.';
                alert(errorMessage);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Registar Novo Utilizador</h3>
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