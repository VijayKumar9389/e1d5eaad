import {FiArrowDownLeft, FiArrowUpRight} from "react-icons/fi";
import React from "react";

const ActivityListItem = ({ activity, onClick }) => {
    const isCallInbound = activity.direction === 'inbound';
    const callAnswered = activity.call_type === 'answered';

    // Format the activity time for display
    const formattedTime = new Date(activity.created_at).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <li className="activity-item" onClick={() => onClick(activity)}>
            <div className="call-info">
                {/* Display call status icon (inbound/outbound, answered/missed) */}
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
                {/* Display the formatted time of the call */}
                <p className="time"><strong>{formattedTime}</strong></p>
            </div>
        </li>
    );
};

export default ActivityListItem;