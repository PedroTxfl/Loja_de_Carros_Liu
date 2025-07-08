import { useState } from 'react';
import { UsuariosList } from '../components/UsuarioList';
import { UsuarioForm } from '../components/UsuarioForm';

export function GerenciarUsuarios() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <>
            <UsuarioForm onSuccess={handleSuccess} />
            <hr />
            <UsuariosList refreshKey={refreshKey} onSuccess={handleSuccess} />
        </>
    );
}