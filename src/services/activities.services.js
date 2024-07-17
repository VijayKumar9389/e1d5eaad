const BASE_URL = 'https://aircall-backend.onrender.com';

// This function fetches the activities from the API
export const getActivities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/activities`);
        if (!response.ok) {
            throw new Error('Failed to fetch activities');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
};

// This function fetches a single activity by its ID
export const getActivityById = async (callId) => {
    try {
        const response = await fetch(`${BASE_URL}/activities/${callId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch activity with ID: ${callId}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error fetching activity with ID: ${callId}`, error);
        throw error;
    }
};

// This function updates an activity by its ID
export const updateActivity = async (callId, isArchived) => {
    try {
        const response = await fetch(`${BASE_URL}/activities/${callId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ is_archived: isArchived })
        });
        if (!response.ok) {
            throw new Error(`Failed to update activity with ID: ${callId}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`Error updating activity with ID: ${callId}`, error);
        throw error;
    }
};

// This function resets all activities
export const resetActivities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/reset`, {
            method: 'PATCH'
        });
        if (!response.ok) {
            throw new Error('Failed to reset activities');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error resetting activities:', error);
        throw error;
    }
};
