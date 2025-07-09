import { useState, useEffect, type FormEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Interfaces para os dados
interface Cliente { id: number; nome: string; }
interface Veiculo { id: number; marca: string; modelo: string; vendido: boolean; }
interface Usuario { id: number; nome: string; }

interface VendaFormProps {
    onSuccess: () => void;
}

export function VendaForm({ onSuccess }: VendaFormProps) {
    const { id: veiculoIdFromUrl } = useParams();

    // Estados para carregar os dados dos selects
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    // Estados para os dados do formulário
    const [clienteId, setClienteId] = useState('');
    const [vendedorId, setVendedorId] = useState('');
    const [valorVenda, setValorVenda] = useState(0);
    const [veiculoId, setVeiculoId] = useState(veiculoIdFromUrl || '');

    // Efeitos para buscar os dados das outras entidades
    useEffect(() => {
        axios.get('http://localhost:3000/api/clientes').then(res => setClientes(res.data));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/veiculos').then(res => {
            // Filtra para mostrar apenas veículos que não foram vendidos
            setVeiculos(res.data.filter((v: Veiculo) => !v.vendido));
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/usuarios').then(res => setUsuarios(res.data));
    }, []);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // Validação manual antes de enviar a requisição
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
        <form onSubmit={handleSubmit}>
            <h2>Registrar Nova Venda</h2>

            <div>
                <select value={clienteId} onChange={e => setClienteId(e.target.value)} required>
                    <option value="">Selecione um Cliente</option>
                    {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>

                <select value={veiculoId} onChange={e => setVeiculoId(e.target.value)} required disabled={!!veiculoIdFromUrl}>
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