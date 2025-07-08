import { useState } from 'react';
import { VeiculosList } from '../components/VeiculoList';
import { VeiculoForm } from '../components/VeiculoForm';

export function GerenciarVeiculos() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <>
            <VeiculoForm onSuccess={handleSuccess} />
            <hr />
            <VeiculosList refreshKey={refreshKey} onSuccess={handleSuccess} />
        </>
    );
}