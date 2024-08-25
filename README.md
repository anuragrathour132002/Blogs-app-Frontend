1. **Clone the Repository**

   ```bash
   git clone 'https://github.com/anuragrathour132002/Blogs-app-Frontend'
   cd frontend
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Running the Project

1. **Start the Development Server**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

   This command starts the development server and opens the application in your default web browser.

## Usage

### User Authentication

- **Sign Up**: Send user data (e.g., email, password) to `/user/signup` to create a new account.
- **Log In**: Send login credentials to `/user/login`. On successful authentication, a token is saved in localStorage.
- **Log Out**: Make a request to `/user/logout` to clear user data and navigate to the home page.

### Post Management

- **Create Post**: Send post data to `/post/create-post/{userId}` to create a new post.
- **View Posts**: Fetch all posts from `/post/view-posts`.
- **View Post by ID**: Fetch a specific post by ID from `/post/view-post/{postId}`.
- **Update Post**: Update a post by sending updated data to `/post/update-post/{postId}`.
- **Delete Post**: Delete a post by ID by sending a request to `/post/delete-post/{postId}`.
- **Search Posts**: Filter posts based on the title by sending a search term to `/post/search?title={searchTerm}`.

### Comment Management

- **Fetch Comments**: Get comments for a post from `/post/fetchComments/{postId}`.
- **Add Comment**: Add a comment to a post by sending data to `/post/addComments/{postId}/{userId}`.

