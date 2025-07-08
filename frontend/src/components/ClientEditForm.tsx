// client/src/components/ClienteEditForm.tsx
import { useState, type FormEvent } from 'react';
import axios from 'axios';

interface Cliente {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone?: string;
}

interface ClienteEditFormProps {
    cliente: Cliente;
    onSuccess: () => void;
    onCancel: () => void;
}

export function ClienteEditForm({ cliente, onSuccess, onCancel }: ClienteEditFormProps) {
    const [formData, setFormData] = useState(cliente);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            await axios.put(`http://localhost:3000/api/clientes/${cliente.id}`, formData);
            alert('Cliente atualizado com sucesso!');
            onSuccess();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Erro ao atualizar cliente.';
            setError(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px', marginTop: '10px' }}>
            <h4>Editando: {cliente.nome}</h4>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input type="text" placeholder="Nome" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div>
                <input type="text" placeholder="CPF" value={formData.cpf} onChange={e => setFormData({ ...formData, cpf: e.target.value })} required />
                <input type="text" placeholder="Telefone" value={formData.telefone || ''} onChange={e => setFormData({ ...formData, telefone: e.target.value })} />
            </div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
                Cancelar
            </button>
        </form>
    );
}