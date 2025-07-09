import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';


interface Venda {
    id: string;
    dataHora: string;
    valorVenda: number;
    cliente: { nome: string };
    veiculo: { marca: string; modelo: string };
    vendedor: { nome: string };
}

interface VendasListProps {
    refreshKey: number;
}

export function VendasList({ refreshKey }: VendasListProps) {
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/api/vendas')
            .then(res => {
                setVendas(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar vendas:", err);
                setLoading(false);
            });
    }, [refreshKey]);

    if (loading) return <p>Carregando histórico de vendas...</p>;

    return (
        <div>
            <h2>Histórico de Vendas</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Veículo</th>
                        <th>Cliente</th>
                        <th>Vendedor</th>
                        <th>Data</th>
                        <th>Valor da Venda</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map(venda => (
                        <tr key={venda.id}>
                            <td>{venda.veiculo.marca} {venda.veiculo.modelo}</td>
                            <td>{venda.cliente.nome}</td>
                            <td>{venda.vendedor.nome}</td>
                            <td>{new Date(venda.dataHora).toLocaleDateString()}</td>
                            <td>R$ {Number(venda.valorVenda).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}