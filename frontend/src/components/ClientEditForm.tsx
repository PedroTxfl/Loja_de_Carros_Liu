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

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        axios.put(`http://localhost:3000/api/clientes/${cliente.id}`, formData)
            .then(() => {
                alert('Cliente atualizado com sucesso!');
                onSuccess();
            })
            .catch(err => {
                console.error("Erro ao atualizar cliente:", err);
                const errorMessage = err.response?.data?.error || 'Ocorreu uma falha ao atualizar o cliente.';
                alert(errorMessage);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px', marginTop: '10px' }}>
            <h4>Editando: {cliente.nome}</h4>
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