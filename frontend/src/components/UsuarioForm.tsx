import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';


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
        <Form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
            <h3>Registar Novo Utilizador</h3>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUserName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Nome do utilizador" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridUserEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUserPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" value={formData.senha} onChange={e => setFormData({ ...formData, senha: e.target.value })} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridUserRole">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control type="text" placeholder="Ex: Vendedor, Gerente" value={formData.cargo} onChange={e => setFormData({ ...formData, cargo: e.target.value })} />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
                Registar Utilizador
            </Button>
        </Form>
    );
}