import { useState, useEffect, useCallback } from 'react';
import { getActivities } from '../services/activities.services';

const useFetchActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchActivities = useCallback(async () => {
        setLoading(true);
        try {
            const activitiesData = await getActivities();
            setActivities(activitiesData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    return { activities, loading, error };
};

export default useFetchActivities;
