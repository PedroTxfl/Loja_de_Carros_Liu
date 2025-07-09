import { Routes, Route, Link } from 'react-router-dom';
import { GerenciarVeiculos } from './pages/GerenciarVeiculos';
import { GerenciarClientes } from './pages/GerenciarClientes';
import { GerenciarVendas } from './pages/GerenciarVendas';
import { GerenciarUsuarios } from './pages/GerenciarUsuarios';
import { GaleriaPage } from './pages/GaleriaPage';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';

function App() {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand as={Link} to="/">Loja de Carros</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Galeria</Nav.Link>
                            <Nav.Link as={Link} to="/veiculos">Gerir Veículos</Nav.Link>
                            <Nav.Link as={Link} to="/clientes">Gerir Clientes</Nav.Link>
                            <Nav.Link as={Link} to="/usuarios">Gerir Utilizadores</Nav.Link>
                            <Nav.Link as={Link} to="/vendas">Registar Venda</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Routes>
                    <Route path="/" element={<GaleriaPage />} />
                    <Route path="/veiculos" element={<GerenciarVeiculos />} />
                    <Route path="/clientes" element={<GerenciarClientes />} />
                    <Route path="/usuarios" element={<GerenciarUsuarios />} />
                    <Route path="/vendas" element={<GerenciarVendas />} />
                    <Route path="/vendas/veiculo/:id" element={<GerenciarVendas />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;