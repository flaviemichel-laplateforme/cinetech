import { useState, useEffect } from 'react';
import { getUrl } from '../utils/api';

export function useFetch(endpoint, params = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpoint) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = getUrl(endpoint, params);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error('Erreur useFetch:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, JSON.stringify(params)]);

    return { data, loading, error };
}