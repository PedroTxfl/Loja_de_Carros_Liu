import { useState } from 'react';
import { ClientesList } from '../components/ClienteList';
import { ClienteForm } from '../components/ClienteForm';

export function GerenciarClientes() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <>
            <ClienteForm onSuccess={handleSuccess} />
            <hr />
            <ClientesList /> 
        </>
    );
}