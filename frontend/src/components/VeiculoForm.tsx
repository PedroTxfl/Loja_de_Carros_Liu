import { useState, type FormEvent, type ChangeEvent } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

interface VeiculoFormProps {
    onSuccess: () => void;
}

export function VeiculoForm({ onSuccess }: VeiculoFormProps) {
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        anoFabricacao: new Date().getFullYear(),
        anoModelo: new Date().getFullYear(),
        cor: '',
        preco: 0,
        placa: '',
    });
    const [imagem, setImagem] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImagem(event.target.files[0]);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        axios.post('http://localhost:3000/api/veiculos', formData)
            .then(response => {
                const novoVeiculoId = response.data.id;

                if (imagem) {
                    const imageFormData = new FormData();
                    imageFormData.append('imagem', imagem);

                    return axios.post(`http://localhost:3000/api/veiculos/${novoVeiculoId}/imagem`, imageFormData);
                }
            })
            .then(() => {
                alert('Veículo registado com sucesso!');
                onSuccess(); 
            })
            .catch(err => {
                console.error("Erro ao registar veículo:", err);

                const errorMessage = err.response?.data?.error || 'Ocorreu uma falha ao registar o veículo.';
                alert(errorMessage);
            });
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
            <h3>Registar Novo Veículo</h3>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" placeholder="Marca" value={formData.marca} onChange={e => setFormData({ ...formData, marca: e.target.value })} required />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control type="text" placeholder="Modelo" value={formData.modelo} onChange={e => setFormData({ ...formData, modelo: e.target.value })} required />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Ano de Fabricação</Form.Label>
                    <Form.Control type="number" placeholder="Ano de Fabricação" value={formData.anoFabricacao} onChange={e => setFormData({ ...formData, anoFabricacao: parseInt(e.target.value) })} required />
                </Form.Group>
                 <Form.Group as={Col}>
                    <Form.Label>Ano do Modelo</Form.Label>
                    <Form.Control type="number" placeholder="Ano do Modelo" value={formData.anoModelo} onChange={e => setFormData({ ...formData, anoModelo: parseInt(e.target.value) })} required />
                </Form.Group>
            </Row>
             <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Cor</Form.Label>
                    <Form.Control type="text" placeholder="Cor" value={formData.cor} onChange={e => setFormData({ ...formData, cor: e.target.value })} required />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Placa</Form.Label>
                    <Form.Control type="text" placeholder="Placa" value={formData.placa} onChange={e => setFormData({ ...formData, placa: e.target.value })} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Preço (R$)</Form.Label>
                    <Form.Control type="number" step="0.01" placeholder="Preço" value={formData.preco} onChange={e => setFormData({ ...formData, preco: parseFloat(e.target.value) })} required />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Imagem do Veículo</Form.Label>
                    <Form.Control type="file" name="imagem" onChange={handleFileChange} />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">Registar</Button>
        </Form>
    );
}