import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap'; 

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
        <Form onSubmit={handleSubmit} className="p-3 bg-light border rounded">
            <h5 className="mb-3">Editando: {cliente.nome}</h5>
             <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} required />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>CPF</Form.Label>
                    <Form.Control type="text" value={formData.cpf} onChange={e => setFormData({ ...formData, cpf: e.target.value })} required />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" value={formData.telefone || ''} onChange={e => setFormData({ ...formData, telefone: e.target.value })} />
                </Form.Group>
            </Row>
            <Button variant="success" type="submit" size="sm">Salvar</Button>
            <Button variant="secondary" onClick={onCancel} size="sm" className="ms-2">Cancelar</Button>
        </Form>
    );
}