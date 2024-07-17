import React, { useState, useEffect } from "react";
import './ActivityDetails.css';
import useFetchActivityByID from "../../hooks/useFetchActivityByID";
import { useParams } from "react-router-dom";
import { updateActivity } from "../../services/activities.services";
import { MdArrowBack } from "react-icons/md";
import {ErrorMessage} from "../../components/Message/Message.jsx";
import ActivityInfo from "./ActivityInfo/ActivityInfo.jsx";

const ActivityDetail = () => {
    const { id } = useParams();
    const { activity, loading, error } = useFetchActivityByID(id);
    const [isArchived, setIsArchived] = useState(false);

    // Effect to update archived state when activity changes
    useEffect(() => {
        if (activity) {
            setIsArchived(activity.is_archived);
        }
    }, [activity]);

    // Function to handle archive/unarchive toggle
    const handleArchiveToggle = async () => {
        const newIsArchived = !isArchived; // Toggle the archived state
        try {
            await updateActivity(activity.id, newIsArchived);
            setIsArchived(newIsArchived); // Update local state after successful API call
            console.log('Activity archived state updated');
        } catch (error) {
            console.error('Error updating activity:', error);
            setIsArchived(prevIsArchived => !prevIsArchived); // Revert back to previous state on error
            // Handle error display or recovery here if needed
        }
    };

    // Function to navigate back in history
    const goBack = () => {
        window.history.back();
    }

    // Render loading state while fetching activity
    if (loading) {
        return null; // Optionally render a loading spinner or message
    }

    // Determine call direction for display
    const isCallInbound = activity.direction === 'inbound';

    // Render activity details with formatted information
    return (
        <div className="activity-detail-container">
            {/* Back button to navigate back */}
            <button className="action-btn" onClick={() => goBack()}>
                <MdArrowBack className="icon" />
            </button>

            {/* Conditional rendering based on error */}
            {error
                ? <ErrorMessage error={`Error fetching activity: ${error.message}`} />
                : <ActivityInfo activity={activity} isCallInbound={isCallInbound} />
            }

            {/* Button to toggle archive state */}
            {!error && (
                <button className="page-btn" onClick={handleArchiveToggle}>
                    {isArchived ? 'Unarchive' : 'Archive'}
                </button>
            )}
        </div>
    );
};

export default ActivityDetail;