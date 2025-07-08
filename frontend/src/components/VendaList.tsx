import { useState, useEffect } from 'react';
import axios from 'axios';

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
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {vendas.map(venda => (
                    <li key={venda.id} style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                        <strong>Veículo:</strong> {venda.veiculo.marca} {venda.veiculo.modelo} <br />
                        <strong>Cliente:</strong> {venda.cliente.nome} | <strong>Vendedor:</strong> {venda.vendedor.nome} <br />
                        <strong>Valor:</strong> R$ {venda.valorVenda} | <strong>Data:</strong> {new Date(venda.dataHora).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}