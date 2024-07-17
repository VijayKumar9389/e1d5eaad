import React, {useState, useEffect} from "react";
import './ActivityDetails.css';
import useFetchActivityByID from "../../hooks/useFetchActivityByID";
import {useParams} from "react-router-dom";
import {updateActivity} from "../../services/activities.services";
import {FaUser} from "react-icons/fa";
import {useLocation} from "react-router-dom";
import {MdArrowBack} from "react-icons/md";

const ActivityDetail = () => {
    const {id} = useParams();
    const {activity, loading, error} = useFetchActivityByID(id);
    const [isArchived, setIsArchived] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (activity) {
            setIsArchived(activity.is_archived);
        }
    }, [activity]);

    const handleArchiveToggle = async () => {
        const newIsArchived = !isArchived; // Toggle the archived state
        try {
            await updateActivity(activity.id, newIsArchived);
            setIsArchived(newIsArchived); // Update local state after successful API call
            console.log('Activity archived state updated');
        } catch (error) {
            console.error('Error updating activity:', error);
            // Handle error or revert state if necessary
            setIsArchived(prevIsArchived => !prevIsArchived); // Revert back to previous state
        }
    };

    const goBack = () => {
        window.history.back();
    }

    if (loading) {
        return null;
    }

    if (error) {
        return (
            <div className="error-message">
                <p>Error message: {error.message}</p>
            </div>
        );
    }

    const isCallInbound = activity.direction === 'inbound';

    const formatDate = (dateTimeString) => {
        const options = {
            year: 'numeric', month: 'short', day: 'numeric'
        };
        return new Date(dateTimeString).toLocaleDateString('en-US', options);
    };

    // Format activity time
    const formatTime = new Date(activity.created_at).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div className="activity-detail-container">
            <button className="action-btn" onClick={() => goBack()}>
                <MdArrowBack className="icon"/>
            </button>
            <div className="activity-detail-wrapper">
                <div className="activity-header">
                    <FaUser className="activity-icon"/>
                </div>
                <div className="activity-body">
                    <p>{`${activity.call_type} ${activity.direction} ${isCallInbound ? 'From' : 'To'} ${isCallInbound ? activity.from : activity.to}`}</p>
                    <p>{`At ${formatTime}`}</p>
                </div>
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
            <button className="page-btn" onClick={handleArchiveToggle}>
                {isArchived ? 'Unarchive' : 'Archive'}
            </button>
        </div>
    );

};

export default ActivityDetail;
