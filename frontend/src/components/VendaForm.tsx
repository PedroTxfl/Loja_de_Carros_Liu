import { useState, useEffect, type FormEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'; 


interface Cliente { id: number; nome: string; }
interface Veiculo { id: number; marca: string; modelo: string; vendido: boolean; }
interface Usuario { id: number; nome: string; }

interface VendaFormProps {
    onSuccess: () => void;
}

export function VendaForm({ onSuccess }: VendaFormProps) {
    const { id: veiculoIdFromUrl } = useParams();

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [clienteId, setClienteId] = useState('');
    const [vendedorId, setVendedorId] = useState('');
    const [valorVenda, setValorVenda] = useState(0);
    const [veiculoId, setVeiculoId] = useState(veiculoIdFromUrl || '');

    useEffect(() => {
        axios.get('http://localhost:3000/api/clientes').then(res => setClientes(res.data));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/veiculos').then(res => {
            setVeiculos(res.data.filter((v: Veiculo) => !v.vendido));
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/usuarios').then(res => setUsuarios(res.data));
    }, []);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!clienteId || !veiculoId || !vendedorId || valorVenda <= 0) {
            alert('Todos os campos são obrigatórios e o valor da venda deve ser positivo.');
            return;
        }

        const vendaData = {
            clienteId: parseInt(clienteId),
            veiculoId: parseInt(veiculoId),
            vendedorId: parseInt(vendedorId),
            valorVenda: valorVenda
        };

        axios.post('http://localhost:3000/api/vendas', vendaData)
            .then(() => {
                alert('Venda registrada com sucesso!');
                onSuccess(); 
            })
            .catch(err => {
                console.error("Erro ao registrar venda:", err);
                const errorMessage = err.response?.data?.error || 'Ocorreu uma falha ao registrar a venda.';
                alert(errorMessage);
            });
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
            <h3>Registar Nova Venda</h3>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCliente">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select value={clienteId} onChange={e => setClienteId(e.target.value)} required>
                        <option value="">Selecione um Cliente...</option>
                        {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridVeiculo">
                    <Form.Label>Veículo</Form.Label>
                    <Form.Select value={veiculoId} onChange={e => setVeiculoId(e.target.value)} required disabled={!!veiculoIdFromUrl}>
                        <option value="">Selecione um Veículo...</option>
                        {veiculos.map(v => <option key={v.id} value={v.id}>{v.marca} {v.modelo}</option>)}
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridVendedor">
                    <Form.Label>Vendedor</Form.Label>
                    <Form.Select value={vendedorId} onChange={e => setVendedorId(e.target.value)} required>
                        <option value="">Selecione um Vendedor...</option>
                        {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridValor">
                    <Form.Label>Valor da Venda</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control type="number" step="0.01" placeholder="Valor da Venda" value={valorVenda} onChange={e => setValorVenda(parseFloat(e.target.value))} required />
                    </InputGroup>
                </Form.Group>
            </Row>
            
            <Button variant="primary" type="submit">
                Registar Venda
            </Button>
        </Form>
    );
}