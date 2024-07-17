import { useState, useEffect } from 'react';
import { getActivities } from '../services/activities.services';

// This hook fetches all activities from the API
const useFetchActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch activities from the API
    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            try {
                const activitiesData = await getActivities();
                setActivities(activitiesData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    return { activities, loading, error };
};

export default useFetchActivities;
