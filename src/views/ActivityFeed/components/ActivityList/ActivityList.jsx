import React from 'react';
import { useNavigate } from "react-router-dom";
import './ActivityList.css';
import ActivityListItem from "./ActivityListItem.jsx";
import {CautionMessage} from "../../../../components/Message/Message.jsx";

const ActivityList = ({ groupedActivities, sortedDates, number }) => {
    const navigate = useNavigate();

    // Function to navigate to the selected activity's detail page
    const selectedActivity = (activity) => {
        navigate(`/${activity.id}`);
    };

    // Display a message if there are no activities to show
    if (number === 0) {
        return CautionMessage({ caution: 'No activities to show' });
    }

    return (
        <>
            {sortedDates.map(date => (
                <div key={date} className="activities-group">
                    {/* Display the date */}
                    <h2 className="group-date">{date}</h2>
                    <ul className="activities-list">
                        {groupedActivities[date].map(activity => (
                            <ActivityListItem
                                key={activity.id}
                                activity={activity}
                                onClick={selectedActivity}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default ActivityList;
