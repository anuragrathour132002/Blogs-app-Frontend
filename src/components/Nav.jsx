import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import 'tailwindcss/tailwind.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux state
import { asyncSignOut } from '../store/actions/userAction'; // Import your action creator

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get dispatch function from useDispatch
  const { isAuth } = useSelector((state) => state.user); // Access authentication state from Redux

  const handleLogout = async () => {
    await dispatch(asyncSignOut(navigate)); // Dispatch the asyncSignOut action
  };

  const menu = (
    <Menu>
      {isAuth && (
        <>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>

          <Menu.Item key="3" icon={<EditOutlined />}>
            <Link to="/publish-post">Publish Post</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<EditOutlined />}>
            <Link to="/view-posts">View Post</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </>
      )}
      {!isAuth && (
        <>
           <Menu.Item key="5" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
          <Menu.Item key="2" icon={<EyeOutlined />}>
          <Link to="/view-posts">View Posts</Link>
        </Menu.Item>
        </>
     
      )}
    </Menu>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold tracking-wider">
          <Link to="/">ZuAI</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          {isAuth ? (
            <>
              <Link to="/profile">
                <Button type="text" className="text-white hover:bg-indigo-500">
                  <UserOutlined /> Profile
                </Button>
              </Link>
              <Link to="/view-posts">
                <Button type="text" className="text-white hover:bg-indigo-500">
                  <EyeOutlined /> View Posts
                </Button>
              </Link>
              <Link to="/publish-post">
                <Button type="text" className="text-white hover:bg-indigo-500">
                  <EditOutlined /> Publish Post
                </Button>
              </Link>
              <Button type="text" className="text-white hover:bg-indigo-500" onClick={handleLogout}>
                <LogoutOutlined /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
              <Button type="text" className="text-white hover:bg-indigo-500">
                <UserOutlined /> Login
              </Button>
            </Link>
             <Link to="/view-posts">
             <Button type="text" className="text-white hover:bg-indigo-500">
               <EyeOutlined /> View Posts
             </Button>
           </Link>
            </>
          
          )}
        </div>
        <div className="md:hidden">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text" className="text-white">
              Menu <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
