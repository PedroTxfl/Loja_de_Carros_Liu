import { Link } from 'react-router-dom';

interface Veiculo {
    id: number;
    marca: string;
    modelo: string;
    anoFabricacao: number;
    preco: number;
    imagemUrl?: string;
    vendido: boolean;
}

interface VeiculoCardProps {
    veiculo: Veiculo;
}

const fallbackImageUrl = "https://via.placeholder.com/300x200.png?text=Sem+Imagem";

export function VeiculoCard({ veiculo}: VeiculoCardProps) {
    const imageUrl = veiculo.imagemUrl 
        ? `http://localhost:3000/uploads/${veiculo.imagemUrl}` 
        : fallbackImageUrl;

    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        width: '300px',
        textAlign: 'center' as const
    };

    const imageStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover' as const,
        borderRadius: '4px'
    };

    return (
        <div style={cardStyle}>
            <img src={imageUrl} alt={`${veiculo.marca} ${veiculo.modelo}`} style={imageStyle} />
            <h3>{veiculo.marca} {veiculo.modelo}</h3>
            <p>Ano: {veiculo.anoFabricacao}</p>
            <h4>R$ {veiculo.preco}</h4>

            {!veiculo.vendido && (
                <Link to={`/vendas/veiculo/${veiculo.id}`}>
                    <button style={{ marginTop: '10px' }}>Vender</button>
                </Link>
            )}
            {veiculo.vendido && <p style={{ color: 'red', fontWeight: 'bold' }}>VENDIDO</p>}
        </div>
    );
}