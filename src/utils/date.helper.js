// Helper function to group activities by date
export const groupActivitiesByDate = activities => {
    const groupedActivities = {}; // Object to store grouped activities

    activities.forEach(activity => {
        const date = new Date(activity.created_at); // Get the date of the activity
        const today = new Date(); // Get today's date

        let key;
        if (date.toDateString() === today.toDateString()) {
            key = 'Today'; // Use 'Today' if activity is from today
        } else {
            // Format date as Month Day, Year (e.g., September 20, 2024)
            key = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }

        const formattedTime = date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }); // Format time for display

        // Initialize array for activities under this date if not exists
        if (!groupedActivities[key]) {
            groupedActivities[key] = [];
        }

        // Push activity with formatted time into the appropriate date group
        groupedActivities[key].push({
            ...activity,
            formattedTime,
        });

        // Sort activities within each date group by created_at timestamp (newest to oldest)
        groupedActivities[key].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    });

    return groupedActivities; // Return the object containing grouped activities
};

// Helper function to sort dates in descending order
export const sortDates = groupedActivities => {
    return Object.keys(groupedActivities).sort((a, b) => {
        if (a === 'Today') return -1; // 'Today' should come before any other date
        if (b === 'Today') return 1;  // Any other date should come after 'Today'
        return new Date(b) - new Date(a); // Sort other dates normally in descending order
    });
};
