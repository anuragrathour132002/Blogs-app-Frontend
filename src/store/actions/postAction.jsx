import { message } from 'antd'; // Ant Design message component for notifications
import axios from '../../config/axios'; // Axios for making HTTP requests
import { saveComments, savePosts, setError, setLoading } from "../reducers/postSlice"; // Redux action to save post data

// Action to create a new post
export const asyncCreateNewPost = (data, userId) => async (dispatch) => {
    try {
        console.log(data)
        const response = await axios.post(`/post/create-post/${userId}`, data);
        await dispatch(savePosts(response.data.post)); // Save post to Redux store
        message.success('Post created successfully!'); // Success toast notification
    } catch (error) {
        console.error(error);
        message.error('Failed to create post. Please try again.'); // Error toast notification
    }
};

// Action to fetch all posts

export const asyncViewPosts = () => async (dispatch) => {
    dispatch(setLoading()); // Set loading to true
    try {
        const response = await axios.get(`/post/view-posts`);
       await dispatch(savePosts(response.data.posts)); // Save posts to Redux store
        message.success('Posts fetched successfully!'); // Success toast notification
    } catch (error) {
        dispatch(setError(error.message)); // Save the error message
        message.error('Failed to fetch posts. Please try again.'); // Error toast notification
    }
};

// Action to fetch a post by ID
export const asyncViewPostById = (postId) => async (dispatch) => {
    try {
        const response = await axios.get(`/post/view-post/${postId}`);
        console.log(response)
       await dispatch(savePosts(response.data.post)); // Save post to Redux store
        message.success('Post fetched successfully!'); // Success toast notification
    } catch (error) {
        console.error(error);
        message.error('Failed to fetch post. Please try again.'); // Error toast notification
    }
};

// Action to update a post by ID
export const asyncUpdatePostById = (postId, data,navigate) => async (dispatch) => {
    try {
        const response = await axios.put(`/post/update-post/${postId}`, data);
        dispatch(savePosts(response.data.post)); // Save updated post to Redux store
        message.success('Post updated successfully!'); // Success toast notification
      await  navigate(`/view-post/${postId}`); // Redirect to the post detail page after updating
    } catch (error) {
        console.error(error);
        message.error('Failed to update post. Please try again.'); // Error toast notification
    }
};

// Action to delete a post by ID
export const asyncDeletePostById = (postId,navigate) => async (dispatch) => {
    try {
        await axios.delete(`/post/delete-post/${postId}`);
        await dispatch(asyncViewPosts())
        await dispatch(asyncFetchComments(postId))
        message.success('Post deleted successfully!'); // Success toast notification
       await navigate('/view-posts')
    } catch (error) {
        console.error(error);
    }
};


export const asyncSearchPost=(searchTerm)=>async(dispatch)=>{
    try {
        const response = await axios.get(`/post/search?title=${searchTerm}`);
       await dispatch(savePosts(response.data)); // Ensure this matches your data structure
    } catch (error) {
        console.log(error)
    }
}

export const asyncFetchComments=(postId)=>async(dispatch)=>{
    try {
        const response=await axios.get(`/post/fetchComments/${postId}`)
        await dispatch(saveComments(response.data.comments))
    } catch (error) {
     console.log(error)   
    }
}

export const asyncAddComments=(postId,userId,data)=>async(dispatch)=>{
    try {
        console.log(postId,userId,data)
        const response=await axios.post(`/post/addComments/${postId}/${userId}`,{data})
        await dispatch(saveComments(response.data.comments))
        await dispatch(asyncFetchComments(postId))
    } catch (error) {
        console.log(error)
    }
}