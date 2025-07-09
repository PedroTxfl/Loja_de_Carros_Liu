import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'; 

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

export function VeiculoCard({ veiculo }: VeiculoCardProps) {
    const imageUrl = veiculo.imagemUrl
        ? `http://localhost:3000/uploads/${veiculo.imagemUrl}`
        : fallbackImageUrl;

    return (
        // Usamos o componente Card
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Img variant="top" src={imageUrl} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{veiculo.marca} {veiculo.modelo}</Card.Title>
                <Card.Text>
                    Ano: {veiculo.anoFabricacao}
                    <br />
                    <strong>R$ {parseFloat(String(veiculo.preco)).toFixed(2)}</strong>
                </Card.Text>
                {!veiculo.vendido ? (
                    <Link to={`/vendas/veiculo/${veiculo.id}`}>
                        <Button variant="primary">Vender</Button>
                    </Link>
                ) : (
                    <Button variant="danger" disabled>Vendido</Button>
                )}
            </Card.Body>
        </Card>
    );
}