// client/src/App.tsx
import { useState } from 'react';
import { VeiculosList } from './components/VeiculoList';
import { VeiculoForm } from './components/VeiculoForm';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(oldKey => oldKey + 1); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <VeiculoForm onSuccess={handleSuccess} />
        <hr />
        {/* Passamos a função de sucesso também para a lista */}
        <VeiculosList refreshKey={refreshKey} onSuccess={handleSuccess} />
      </header>
    </div>
  );
}

export default App;