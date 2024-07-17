import {getActivityById} from "../services/activities.services";
import {useState, useEffect} from "react";

// This hook fetches a single activity by its ID from the API
const useFetchActivityByID = (callId) => {
    const [activity, setActivity] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivity = async () => {
            setLoading(true);
            try {
                const activityData = await getActivityById(callId);
                setActivity(activityData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [callId]);

    return { activity, loading, error };
}

export default useFetchActivityByID;