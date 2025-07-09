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

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        axios.post('http://localhost:3000/api/clientes', formData)
            .then(() => {
                alert('Cliente cadastrado com sucesso!');
                onSuccess();
            })
            .catch(err => {
                console.error("Erro ao cadastrar cliente:", err);
                const errorMessage = err.response?.data?.error || 'Ocorreu uma falha ao cadastrar o cliente.';
                alert(errorMessage);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Cadastrar Novo Cliente</h3>
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