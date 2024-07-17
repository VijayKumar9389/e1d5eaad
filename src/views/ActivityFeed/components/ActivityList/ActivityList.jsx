import React from 'react';
import { useNavigate } from "react-router-dom";
import './ActivityList.css';
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";

const ActivityList = ({ groupedActivities, sortedDates, number }) => {
    const navigate = useNavigate();

    // Navigate to the selected activity
    const selectedActivity = (activity) => {
        navigate(`/${activity.id}`);
    };

    if (number === 0) {
        return <p className="no-activities">No activities to display</p>;
    }

    return (
        <>
            {sortedDates.map(date => (
                <div key={date} className="activities-group">
                    {/* Display the date */}
                    <h2 className="group-date">{date}</h2>
                    <ul className="activities-list">
                        {groupedActivities[date].map(activity => {
                            const isCallInbound = activity.direction === 'inbound';
                            const callAnswered = activity.call_type === 'answered';

                            // Format activity time
                            const formattedTime = new Date(activity.created_at).toLocaleTimeString([], {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                            });

                            return (
                                <li key={activity.id} className="activity-item" onClick={() => selectedActivity(activity)}>
                                    <div className="call-info">
                                        {/* Display call status */}
                                        <div className={callAnswered ? 'green' : 'red'}>
                                            {isCallInbound ? <FiArrowDownLeft className="status" /> : <FiArrowUpRight className="status" />}
                                        </div>
                                        <div>
                                            {/* Display caller and call details */}
                                            <p className="activity-number">
                                                {isCallInbound ? activity.from : activity.to}
                                            </p>
                                            <p>{`${activity.call_type} ${isCallInbound ? 'call from' : 'call to'} ${isCallInbound ? activity.to : activity.from}`}</p>
                                        </div>
                                        {/* Display formatted time */}
                                        <p className="time"><strong>{formattedTime}</strong></p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default ActivityList;
