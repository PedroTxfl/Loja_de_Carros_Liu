// client/src/components/VeiculosList.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

// Definimos uma interface para o tipo de dado do veículo, 
// espelhando a entidade do seu back-end
interface Veiculo {
    id: number;
    marca: string;
    modelo: string;
    anoFabricacao: number;
    preco: number;
    vendido: boolean;
}

export function VeiculosList() {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/veiculos')
            .then(response => {
                setVeiculos(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Falha ao carregar os veículos.');
                setLoading(false);
                console.error(err);
            });
    }, []); 

    if (loading) {
        return <p>Carregando veículos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Lista de Veículos</h1>
            <ul>
                {veiculos.map(veiculo => (
                    <li key={veiculo.id}>
                        {veiculo.marca} {veiculo.modelo} ({veiculo.anoFabricacao}) - R$ {veiculo.preco}
                    </li>
                ))}
            </ul>
        </div>
    );
}