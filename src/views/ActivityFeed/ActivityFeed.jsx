import React, { useState, useEffect } from 'react';
import './ActivityFeed.css';
import useFetchActivities from '../../hooks/useFetchActivities';
import { groupActivitiesByDate, sortDates } from "../../utils/date.helper";
import { useNavigate } from "react-router-dom";
import ActivityActions from "./components/ActivityActions/ActivityActions.jsx";
import ActivityList from "./components/ActivityList/ActivityList.jsx";
import Cookies from 'js-cookie';

const ActivityFeed = () => {
    const { activities, loading, error } = useFetchActivities();
    const [viewArchived, setViewArchived] = useState(false);
    const navigate = useNavigate();

    // Load viewArchived state from cookie on component mount
    useEffect(() => {
        const savedViewArchived = Cookies.get('viewArchived');
        if (savedViewArchived) {
            setViewArchived(savedViewArchived === 'true'); // Convert string to boolean
        }
    }, []);

    // Save viewArchived state to cookie whenever it changes
    useEffect(() => {
        Cookies.set('viewArchived', viewArchived, { expires: 7 }); // Expires in 7 days
    }, [viewArchived]);

    if (loading) {
        return null; // Handle loading state as needed
    }

    if (error) {
        return <p>Error fetching activities: {error.message}</p>; // Display error message if fetching fails
    }

    // Filter activities based on viewArchived state
    const filteredActivities = activities.filter(activity => activity.is_archived === viewArchived);

    // Group activities by date and sort dates in descending order
    const groupedActivities = groupActivitiesByDate(filteredActivities);
    const sortedDates = sortDates(groupedActivities);

    return (
        <div className="activities-container">
            <ActivityActions
                activities={activities}
                viewArchived={viewArchived}
                setIsArchived={setViewArchived}
            />
            <ActivityList
                groupedActivities={groupedActivities}
                sortedDates={sortedDates}
                number={filteredActivities.length}
            />
        </div>
    );
};

export default ActivityFeed;
