import { useState, useEffect } from 'react';
import axios from 'axios';
import { VeiculoCard } from '../components/VeiculoCard';

interface Veiculo {
    id: number;
    marca: string;
    modelo: string;
    anoFabricacao: number;
    preco: number;
    imagemUrl?: string;
}

export function GaleriaPage() {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/api/veiculos').then(res => {
            setVeiculos(res.data);
            setLoading(false);
        });
    }, []);

    const gridStyle = {
        display: 'flex',
        flexWrap: 'wrap' as const,
        justifyContent: 'center'
    };

    if (loading) return <p>A carregar galeria...</p>;

    return (
        <div>
            <h1>Galeria de Veículos</h1>
            <div style={gridStyle}>
                {veiculos.map(v => <VeiculoCard key={v.id} veiculo={v} />)}
            </div>
        </div>
    );
}