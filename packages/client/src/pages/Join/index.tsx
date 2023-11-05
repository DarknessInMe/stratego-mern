import React, { memo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSessionControllers } from 'hooks/useSessionControllers';
import { ROUTES } from 'router';

export const Join = memo(() => {
    const { onJoin } = useSessionControllers();
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            return history(ROUTES.HOME);
        }

        onJoin(id);
    }, []);

    return (
        <div>Loading ...</div>
    );
});
