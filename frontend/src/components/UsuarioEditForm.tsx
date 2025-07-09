import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap'; 


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

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        axios.put(`http://localhost:3000/api/usuarios/${usuario.id}`, formData)
            .then(() => {
                alert('Utilizador atualizado com sucesso!');
                onSuccess();
            })
            .catch(err => {
                console.error("Erro ao atualizar utilizador:", err);
                const errorMessage = err.response?.data?.error || 'Ocorreu uma falha ao atualizar o utilizador.';
                alert(errorMessage);
            });
    };

    return (
        <Form onSubmit={handleSubmit} className="p-3 bg-light border rounded">
            <h5 className="mb-3">Editando: {usuario.nome}</h5>
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
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control type="text" value={formData.cargo || ''} onChange={e => setFormData({ ...formData, cargo: e.target.value })} />
                </Form.Group>
            </Row>
            <Button variant="success" type="submit" size="sm">Salvar</Button>
            <Button variant="secondary" onClick={onCancel} size="sm" className="ms-2">Cancelar</Button>
        </Form>
    );
}