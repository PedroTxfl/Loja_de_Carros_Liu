import { useState } from 'react';
import { VendasList } from '../components/VendaList';
import { VendaForm } from '../components/VendaForm';

export function GerenciarVendas() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <>
            <VendaForm onSuccess={handleSuccess} />
            <hr />
            <VendasList refreshKey={refreshKey} />
        </>
    );
}