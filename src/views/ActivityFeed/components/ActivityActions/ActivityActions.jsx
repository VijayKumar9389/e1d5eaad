import React from 'react';
import {getActivities, updateActivity, resetActivities} from '../../../../services/activities.services';
import './ActivityActions.css';

const ActivityActions = ({viewArchived, setIsArchived, activities}) => {

    // Separate archived and unarchived activities
    const archivedActivities = activities.filter(activity => activity.is_archived);
    const unarchivedActivities = activities.filter(activity => !activity.is_archived);

    // Filter activities based on viewArchived state
    const filteredActivities = activities.filter(activity => activity.is_archived === viewArchived);

    // Update all activities' archived state
    const updateAllActivities = async (isArchived) => {
        try {
            const activities = await getActivities();
            const updatePromises = activities.map(activity =>
                updateActivity(activity.id, isArchived)
            );
            await Promise.all(updatePromises);
            console.log('All activities updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating all activities:', error);
        }
    };

    // Reset all activities to their initial state
    const handleResetActivities = async () => {
        try {
            await resetActivities();
            console.log('Activities reset successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error resetting activities:', error);
        }
    };

    return (
        <>
            <ul className="sub-menu">
                <li
                    className={`submenu-item ${!viewArchived ? 'selected' : ''}`}
                    onClick={() => setIsArchived(false)}
                >
                    Activities ({unarchivedActivities.length})
                </li>
                <li
                    className={`submenu-item ${viewArchived ? 'selected' : ''}`}
                    onClick={() => setIsArchived(true)}
                >
                    Archived ({archivedActivities.length})
                </li>
            </ul>
            {filteredActivities.length !== 0 && (
                <div className="actions-wrapper">
                    {viewArchived ? (
                        <button
                            className="page-btn"
                            onClick={() => {
                                handleResetActivities().then(() => window.location.reload())
                            }}>
                            Reset All
                        </button>
                    ) : (
                        <button
                            className="page-btn"
                            onClick={() => {
                                updateAllActivities(true).then(() => window.location.reload());
                            }}
                        >
                            Archive All
                        </button>
                    )}
                </div>
            )}

        </>
    );
};

export default ActivityActions;