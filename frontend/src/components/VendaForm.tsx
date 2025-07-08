import { useState, useEffect, type FormEvent } from 'react';
import axios from 'axios';

interface Cliente { id: number; nome: string; }
interface Veiculo { id: number; marca: string; modelo: string; vendido: boolean; }
interface Usuario { id: number; nome: string; }

interface VendaFormProps {
    onSuccess: () => void;
}

export function VendaForm({ onSuccess }: VendaFormProps) {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [clienteId, setClienteId] = useState('');
    const [veiculoId, setVeiculoId] = useState('');
    const [vendedorId, setVendedorId] = useState('');
    const [valorVenda, setValorVenda] = useState(0);

    const [error, setError] = useState<string | null>(null);

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

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!clienteId || !veiculoId || !vendedorId || valorVenda <= 0) {
            setError('Todos os campos são obrigatórios e o valor da venda deve ser positivo.');
            return;
        }

        const vendaData = {
            clienteId: parseInt(clienteId),
            veiculoId: parseInt(veiculoId),
            vendedorId: parseInt(vendedorId),
            valorVenda: valorVenda
        };

        try {
            await axios.post('http://localhost:3000/api/vendas', vendaData);
            alert('Venda registrada com sucesso!');
            onSuccess(); 
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao registrar venda.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar Nova Venda</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <select value={clienteId} onChange={e => setClienteId(e.target.value)} required>
                    <option value="">Selecione um Cliente</option>
                    {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>

                <select value={veiculoId} onChange={e => setVeiculoId(e.target.value)} required>
                    <option value="">Selecione um Veículo</option>
                    {veiculos.map(v => <option key={v.id} value={v.id}>{v.marca} {v.modelo}</option>)}
                </select>
            </div>

            <div>
                <select value={vendedorId} onChange={e => setVendedorId(e.target.value)} required>
                    <option value="">Selecione um Vendedor</option>
                    {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
                </select>

                <input type="number" step="0.01" placeholder="Valor da Venda" onChange={e => setValorVenda(parseFloat(e.target.value))} required />
            </div>

            <button type="submit">Registrar Venda</button>
        </form>
    );
}