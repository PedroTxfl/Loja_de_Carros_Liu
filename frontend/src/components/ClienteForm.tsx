import { useState, type FormEvent } from 'react';
import axios from 'axios';

interface ClienteFormProps {
    onSuccess: () => void;
}

export function ClienteForm({ onSuccess }: ClienteFormProps) {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            await axios.post('http://localhost:3000/api/clientes', formData);
            alert('Cliente cadastrado com sucesso!');
            onSuccess(); 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Erro ao cadastrar cliente.';
            setError(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Cadastrar Novo Cliente</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input type="text" placeholder="Nome" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div>
                <input type="text" placeholder="CPF" value={formData.cpf} onChange={e => setFormData({ ...formData, cpf: e.target.value })} required />
                <input type="text" placeholder="Telefone" value={formData.telefone} onChange={e => setFormData({ ...formData, telefone: e.target.value })} />
            </div>
            <button type="submit">Cadastrar Cliente</button>
        </form>
    );
}