import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap'; 

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
        <Form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
            <h3>Cadastrar Novo Cliente</h3>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridNome">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control type="text" placeholder="Nome do cliente" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCPF">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control type="text" placeholder="CPF (apenas números)" value={formData.cpf} onChange={e => setFormData({ ...formData, cpf: e.target.value })} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTelefone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" placeholder="Telefone" value={formData.telefone} onChange={e => setFormData({ ...formData, telefone: e.target.value })} />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
                Cadastrar Cliente
            </Button>
        </Form>
    );
}