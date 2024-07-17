import React, { useState, useEffect } from "react";
import './ActivityDetails.css';
import useFetchActivityByID from "../../hooks/useFetchActivityByID";
import { useParams, useLocation } from "react-router-dom";
import { updateActivity } from "../../services/activities.services";
import { FaUser } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { formatTime, formatDate } from "../../utils/date.helper";
import {ErrorMessage} from "../../components/Message/Message.jsx";

const ActivityDetail = () => {
    const { id } = useParams();
    const { activity, loading, error } = useFetchActivityByID(id);
    const [isArchived, setIsArchived] = useState(false);
    const location = useLocation();

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

    // Render error message if fetch fails
    if (error) {
        return <ErrorMessage error={`Error fetching activity: ${error.message}`} />;
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
            <div className="activity-detail-wrapper">
                {/* Header section with user icon */}
                <div className="activity-header">
                    <FaUser className="activity-icon" />
                </div>
                {/* Body section with call details */}
                <div className="activity-body">
                    <p>{`${activity.call_type} ${activity.direction} ${isCallInbound ? 'From' : 'To'} ${isCallInbound ? activity.from : activity.to}`}</p>
                    <p>{`At ${formatTime(activity.created_at)}`}</p>
                </div>
                {/* Additional details section */}
                <div className="activity-details">
                    <div className="detail-row">
                        <p className="detail-label">Date:</p>
                        <p>{formatDate(activity.created_at)}</p>
                    </div>
                    <div className="detail-row">
                        <p className="detail-label">Duration:</p>
                        <p className="detail-value">{activity.duration} seconds</p>
                    </div>
                    <div className="detail-row">
                        <p className="detail-label">AirCall Number:</p>
                        <p className="detail-value">{activity.via}</p>
                    </div>
                </div>
            </div>
            {/* Button to toggle archive state */}
            <button className="page-btn" onClick={handleArchiveToggle}>
                {isArchived ? 'Unarchive' : 'Archive'}
            </button>
        </div>
    );
};

export default ActivityDetail;