import { removeUser, saveUser } from "../reducers/userSlice"; // Redux actions to manage user state
import { message } from 'antd'; // Ant Design message component for notifications
import axios from '../../config/axios'; // Axios for making HTTP requests

/**
 * Async action to fetch the current user from the backend.
 * It checks for a valid token and retrieves the user information if available.
 * If the token is expired or missing, it clears the user data.
 */
export const asyncCurrentUser = () => async (dispatch) => {
    try {
        // Retrieve token and token expiration time from localStorage
        const token = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        console.log('Token:', token);
        console.log('Token Expiration:', tokenExpiration);

        // If token is not available or has expired, clear the user data
        if (!token || !tokenExpiration || tokenExpiration < Date.now()) {
            console.log('Token missing or expired');
            dispatch(saveUser(null)); // Dispatch action to clear user data
            return;
        }

        // Make an authenticated request to fetch the current user
        const response = await axios.post('/user/currentUser', null, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Current User Response:', response);

        // Dispatch action to save the current user in the Redux store
        dispatch(saveUser(response.data.user));
    } catch (error) {
        console.error('Error fetching current user:', error);

        // Optionally clear user data if fetching current user fails
        dispatch(saveUser(null));
    }
};

/**
 * Async action to sign up a new user.
 * It sends user data to the backend and, upon success, saves the user and displays a success message.
 * If the email already exists, an error message is displayed.
 */
export const asyncSignupUser = (userData) => async (dispatch) => {
    try {
        // Log the user data to check its format
        console.log('User Data:', userData);
        
        // Make a POST request to the signup endpoint with the user data
        const response = await axios.post('/user/signup', userData);
        console.log('Signup Response:', response);

        // Dispatch action to save the new user in the Redux store
        dispatch(saveUser(response.data.user)); // Ensure you are saving the correct data

        // Show success message
        message.success("SignUp Successfully!");
    } catch (error) {
        console.error('Error during signup:', error);

        // Show error message if signup fails
        message.error('Email already exists or signup failed.');
    }
};
  
/**
 * Async action to log in a user.
 * It authenticates the user, saves the token and its expiration time, and fetches the current user.
 * If the credentials are invalid, an error message is displayed.
 */
export const asyncSignIn = (data, navigate) => async (dispatch) => {
    try {
        // Log the login data to check its format
        console.log('Login Data:', data);

        // Make a request to log in the user
        const response = await axios.post('/user/login', data);
        console.log('Login Response:', response);

        // Save the token and expiration time in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpiration', response.data.tokenExpiration); // Ensure expiration is saved

        // Fetch the current user after successful login
        await dispatch(asyncCurrentUser());

        // Display a success message using Ant Design's message component
        message.success("Logged in Successfully!");

        // Navigate to the profile page
        navigate('/profile');
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Display an error message if the credentials are invalid
            message.error('Invalid email or password. Please try again.');
        } else {
            console.error('Error during login:', error);
            // Display a generic error message for other errors
            message.error('An error occurred. Please try again later.');
        }
    }
};

/**
 * Async action to log out a user.
 * It clears the user data, displays a success message, and navigates to the home page.
 */
export const asyncSignOut = (navigate) => async (dispatch) => {
    try {
        // Make a request to log out the user
        const response = await axios.get('/user/logout');
        console.log('Logout Response:', response);

        // Dispatch action to remove the user from the Redux store
        dispatch(removeUser());

        // Clear token and expiration from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');

        // Display a success message using Ant Design's message component
        message.success("Logout Successfully!");

        // Navigate to the home page after logout
        navigate('/');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
