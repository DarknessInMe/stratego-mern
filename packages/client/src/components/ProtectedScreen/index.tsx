import { useSessionContext } from 'context/SessionContext';
import React, { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'router';

export const ProtectedScreen = memo(() => {
    const { session } = useSessionContext();

    if (!session) {
        return <Navigate to={ROUTES.HOME} replace/>;
    }
    return (
        <Outlet />
    );
});
