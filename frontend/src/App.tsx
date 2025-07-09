// client/src/App.tsx
import { Routes, Route, Link } from 'react-router-dom';
import { GerenciarVeiculos } from './pages/GerenciarVeiculos';
import { GerenciarClientes } from './pages/GerenciarClientes';
import { GerenciarVendas } from './pages/GerenciarVendas';
import { GerenciarUsuarios } from './pages/GerenciarUsuarios';
import { GaleriaPage } from './pages/GaleriaPage';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <nav>
                    <Link to="/"><button>Galeria</button></Link>
                    <Link to="/veiculos"><button>Gerir Veículos</button></Link>
                    <Link to="/clientes"><button>Gerir Clientes</button></Link>
                    <Link to="/usuarios"><button>Gerir Utilizadores</button></Link>
                    <Link to="/vendas"><button>Registar Venda</button></Link>
                </nav>
                <hr />

                <Routes>
                    <Route path="/" element={<GaleriaPage />} />
                    <Route path="/veiculos" element={<GerenciarVeiculos />} />
                    <Route path="/clientes" element={<GerenciarClientes />} />
                    <Route path="/usuarios" element={<GerenciarUsuarios />} />

                    <Route path="/vendas" element={<GerenciarVendas />} />

                    <Route path="/vendas/veiculo/:id" element={<GerenciarVendas />} />
                </Routes>
            </header>
        </div>
    );
}

export default App;