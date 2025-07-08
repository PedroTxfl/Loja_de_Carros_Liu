import { useState } from 'react';
import { GerenciarVeiculos } from './pages/GerenciarVeiculos';
import { GerenciarClientes } from './pages/GerenciarClientes';
import { GerenciarVendas } from './pages/GerenciarVendas';
import { GerenciarUsuarios } from './pages/GerenciarUsuarios';
import { GaleriaPage } from './pages/GaleriaPage'; 
import './App.css';

function App() {
    const [pagina, setPagina] = useState<'galeria' | 'veiculos' | 'clientes' | 'vendas' | 'usuarios'>('galeria');

    return (
        <div className="App">
            <header className="App-header">
                <nav>
                    <button onClick={() => setPagina('galeria')}>Galeria</button> 
                    <button onClick={() => setPagina('veiculos')}>Gerir Veículos</button>
                    <button onClick={() => setPagina('clientes')}>Gerir Clientes</button>
                    <button onClick={() => setPagina('usuarios')}>Gerir Utilizadores</button>
                    <button onClick={() => setPagina('vendas')}>Registar Venda</button>
                </nav>
                <hr />
                {pagina === 'galeria' && <GaleriaPage />} 
                {pagina === 'veiculos' && <GerenciarVeiculos />}
                {pagina === 'clientes' && <GerenciarClientes />}
                {pagina === 'usuarios' && <GerenciarUsuarios />}
                {pagina === 'vendas' && <GerenciarVendas />}
            </header>
        </div>
    );
}

export default App;