import React from "react";
import { FaUser } from "react-icons/fa";
import { formatTime, formatDate } from "../../../utils/date.helper";

const ActivityInfo = ({ activity, isCallInbound }) => {
    return (
        <div className="activity-info">
            {/* Header section with user icon */}
            <div className="info-header">
                <FaUser className="info-icon" />
            </div>
            {/* Body section with call details */}
            <div className="info-body">
                <p>{`${activity.call_type} ${activity.direction} ${isCallInbound ? 'From' : 'To'} ${isCallInbound ? activity.from : activity.to}`}</p>
                <p>{`At ${formatTime(activity.created_at)}`}</p>
            </div>
            {/* Additional details section */}
            <div className="info-details">
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
    );
};

export default ActivityInfo;
