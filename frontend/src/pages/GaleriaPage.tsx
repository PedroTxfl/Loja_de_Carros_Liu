import { useState, useEffect } from 'react';
import axios from 'axios';
import { VeiculoCard } from '../components/VeiculoCard';
import { Row, Col } from 'react-bootstrap'; 


export function GaleriaPage() {
    const [veiculos, setVeiculos] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/veiculos').then(res => {
            setVeiculos(res.data);
        });
    }, []);
    return (
        <div>
            <h1 className="mb-4">Galeria de Veículos</h1>
            <Row>
                {veiculos.map(v => (
                    <Col xs={12} md={6} lg={4} className="d-flex justify-content-center mb-4" key={v.id}>
                        <VeiculoCard veiculo={v} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
