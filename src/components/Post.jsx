import { Form, Input, Button,Col,Row,Spin, Card, Typography, message,Modal } from 'antd';
import 'antd/dist/reset.css';;
import { asyncAddComments, asyncCreateNewPost, asyncDeletePostById, asyncFetchComments, asyncSearchPost, asyncUpdatePostById, asyncViewPostById, asyncViewPosts } from '../store/actions/postAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CommentOutlined } from '@ant-design/icons'; // Import the Comment icon

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export const ViewPost = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector(state => state.post);
    const { user } = useSelector(state => state.user); // Get the logged-in user's ID from Redux
    useEffect(() => {
        if (searchQuery) {
            dispatch(asyncSearchPost(searchQuery));
        } else {
            dispatch(asyncViewPosts());
        }
    }, [dispatch, searchQuery]);

    const highlightText = (text, query) => {
        if (!query.trim()) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.split(regex).map((part, index) =>
            regex.test(part) ? (
                <span key={index} style={{ backgroundColor: 'yellow' }}>
                    {part}
                </span>
            ) : (
                part
            )
        );
    };
    const navigate=useNavigate()

    const handleDelete = async(post) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            if (user._id === post.userId) { // Check if the userId matches the post's authorId
               await dispatch(asyncDeletePostById(post._id,navigate));
            } else {
                message.error('You do not have permission to delete this post.');
            }
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        message.error('Failed to load posts.');
        return null;
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <Title level={2} className="text-center mb-4">All Posts</Title>
            <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={handleSearch}
                className="mb-4"
                disabled={!posts || posts.length === 0} // Disable search input if no posts are available
            />
            <Row gutter={16}>
                {posts && posts.length > 0 ? (
                    posts.map(post => (
                        <Col key={post._id} xs={24} sm={12} md={8} lg={6} className="mb-4">
                            <Card
                                hoverable
                                className="shadow-md rounded-md"
                                actions={[
                                    <Link to={`/view-post/${post._id}`}>View</Link>,
                                    <Link to={`/update-post/${post._id}`}>Update</Link>,
                                    <Button type="link" danger onClick={() => handleDelete(post)}>Delete</Button>
                                ]}
                            >
                                <Title level={4}>
                                    {highlightText(post.title, searchQuery)}
                                </Title>
                                <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                                    {highlightText(post.excerpt, searchQuery)}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col span={24}>
                        <Card>
                            <Title level={4}>No Posts Available</Title>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
};



export const ViewPostById = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posts, comments, loading, error } = useSelector(state => state.post);
    const { user } = useSelector(state => state.user);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(asyncViewPostById(id));
            dispatch(asyncFetchComments(id)); // Fetch comments for the post
        }
    }, [dispatch, id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleDelete = async () => {
        if (id) {
            const confirm = window.confirm('Are you sure you want to delete this post?');
            if (confirm) {
                await dispatch(asyncDeletePostById(id, navigate));
            }
        }
    };

    const showModal = () => {
        if (!user) {
            message.warning('You must be logged in to add a comment.');
            navigate('/login'); // Redirect to home or login page
        } else {
            setIsModalVisible(true);
        }
    };

    const handleOk = async () => {
        if (!user) {
            message.warning('You must be logged in to add a comment.');
            navigate('/'); // Redirect to home or login page
            return;
        }

        if (comment.trim()) {
            try {
                await dispatch(asyncAddComments(id, user._id, comment));
                setComment('');
                setIsModalVisible(false);
            } catch (error) {
                message.error('Failed to add comment. Please try again.');
                console.error(error);
            }
        } else {
            message.error('Comment cannot be empty.');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        message.error('Failed to load post.');
        return null;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Card
                className="shadow-lg rounded-lg mb-4"
                actions={[
                    <Link  onClick={handleBack}>Back</Link>,
                    <Link to={`/update-post/${id}`}>Edit</Link>,
                    <Button type="link" danger onClick={handleDelete}>Delete</Button>,
                    <Button type="link" onClick={showModal}>
                        <CommentOutlined /> 
                    </Button>,
                ]}
            >
                <Title level={2} className="text-center mb-4">{posts?.title || 'Post Title'}</Title>
                <Paragraph className="mb-4">
                    {posts?.content || 'Post content goes here...'}
                </Paragraph>
            </Card>

            {/* Comments Section */}
            <div className="comments-section mb-4">
                {comments?.length > 0 ? (
                    comments.map(comment => (
                        <Card key={comment._id} className="mb-4 shadow-sm rounded-lg">
                            <div className="flex items-center mb-2">
                                {/* Add user avatar if available */}
                                <div className="ml-3">
                                    <Title level={5} className="mb-0">{comment.userId.firstName} {comment.userId.lastName}</Title>
                                    <Paragraph>{comment.text}</Paragraph>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Paragraph>No comments yet.</Paragraph>
                )}
            </div>

            {/* Modal for adding comments */}
            <Modal
                title="Add Comment"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Add Comment
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item>
                        <Input.TextArea
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter your comment"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export const PublishPost = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false); // Local state for loading

    const onFinish = async (values) => {
        setLoading(true); // Set loading to true when starting the request
            await dispatch(asyncCreateNewPost(values, user._id));
            form.resetFields(); // Reset form fields after successful submission
           await navigate('/view-posts'); // Redirect to posts list or another page as needed
       
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Form submission failed:', errorInfo);
        message.error('Failed to publish post. Please check your inputs.');
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <Card className="shadow-lg rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                <Title level={2} className="text-center text-indigo-600">Publish New Post</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ title: '', excerpt: '', content: '' }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            { required: true, message: 'Please enter the title' },
                            { max: 100, message: 'Title cannot be more than 100 characters' },
                        ]}
                    >
                        <Input placeholder="Enter the title" />
                    </Form.Item>

                    <Form.Item
                        label="Excerpt"
                        name="excerpt"
                        rules={[
                            { required: true, message: 'Please enter an excerpt' },
                            { max: 200, message: 'Excerpt cannot be more than 200 characters' },
                        ]}
                    >
                        <Input placeholder="Enter a short summary of the post" />
                    </Form.Item>

                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please enter the content' }]}
                    >
                        <TextArea rows={6} placeholder="Enter the main content of the post" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            loading={loading} // Show loader when form is submitting
                        >
                            Publish Post
                        </Button>
                    </Form.Item>
                </Form>

                {/* Show spinner overlay while posting */}
                {loading && (
                    <div className="flex justify-center items-center absolute inset-0 bg-gray-500 bg-opacity-50">
                        <Spin size="large" />
                    </div>
                )}
            </Card>
        </div>
    );
};


export const UpdatePost = () => {
    const { id } = useParams(); // Get postId from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get the post data and current user info from the state
    const { posts, loading, error } = useSelector(state => state.post);
    const { user } = useSelector(state => state.user); // Assuming you have an auth slice with the current user

    useEffect(() => {
        if (id) {
            dispatch(asyncViewPostById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (posts) {
            form.setFieldsValue({
                title: posts.title,
                content: posts.content,
                excerpt: posts.excerpt, // Add the excerpt field
            });
        }
    }, [posts, form]);

    const onFinish = async (values) => {
        if (user && posts && user._id && posts.userId) {
            if (user._id.toString() === posts.userId.toString()) {
                setIsSubmitting(true);
                try {
                    await dispatch(asyncUpdatePostById(id, values, navigate));
                } finally {
                    setIsSubmitting(false);
                }
            } else {
                message.error('You are not authorized to update this post.');
            }
        } else {
            message.error('Post or user data is missing.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        ); // Loading spinner
    }

    if (posts && user && user._id && posts.userId && user._id.toString() !== posts.userId.toString()) {
        message.error('You are not authorized to update this post.');
        return null; // Or navigate to an error page
    }

    if (error) {
        message.error('Failed to load post.'); // Error toast notification
        return null;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-center mb-4">Update Post</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    title: posts?.title,
                    content: posts?.content,
                    excerpt: posts?.excerpt, // Initialize the excerpt field
                }}
                className="shadow-lg rounded-lg p-4 bg-white relative"
            >
                {isSubmitting && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
                        <Spin size="large" />
                    </div>
                )}
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please enter the post title' }]}
                >
                    <Input placeholder="Enter post title" />
                </Form.Item>

                <Form.Item
                    name="excerpt"
                    label="Excerpt"
                    rules={[{ required: true, message: 'Please enter the post excerpt' }]}
                >
                    <TextArea rows={2} placeholder="Enter post excerpt" />
                </Form.Item>

                <Form.Item
                    name="content"
                    label="Content"
                    rules={[{ required: true, message: 'Please enter the post content' }]}
                >
                    <TextArea rows={6} placeholder="Enter post content" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" disabled={isSubmitting}>
                        Update Post
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};