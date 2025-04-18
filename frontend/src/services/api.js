/**
 * API service for communicating with the backend
 */

// API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Create a study plan
 * 
 * @param {Object} planData - Study plan data
 * @param {string} planData.subject - Study subject
 * @param {string} planData.duration - Study duration
 * @param {Array} planData.topics - Specific topics (optional)
 * @returns {Promise} - Study plan data
 */
export async function createStudyPlan(planData) {
  try {
    const response = await fetch(`${API_URL}/study/plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating study plan:', error);
    throw error;
  }
}

/**
 * Get study resources for a subject
 * 
 * @param {string} subject - Study subject
 * @returns {Promise} - Study resources data
 */
export async function getStudyResources(subject) {
  try {
    const response = await fetch(`${API_URL}/study/resources?subject=${encodeURIComponent(subject)}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting study resources:', error);
    throw error;
  }
}

/**
 * Send a message to the AI assistant
 * 
 * @param {Object} messageData - Message data
 * @param {string} messageData.message - User message text
 * @param {string} messageData.context - Optional context for the conversation
 * @returns {Promise} - AI response data
 */
export async function sendMessage(messageData) {
  try {
    const response = await fetch(`${API_URL}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

/**
 * Perform a health check on the API
 * 
 * @returns {Promise} - Health check status
 */
export async function healthCheck() {
  try {
    const response = await fetch(`${API_URL}/health`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
}