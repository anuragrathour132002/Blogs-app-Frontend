import React from 'react';
import { Layout, Typography, Space, Button, Divider } from 'antd';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterComponent = () => {
    return (
        <Footer className="bg-yellow-200 text-black py-12">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
                {/* About Section */}
                <div className="mb-8 md:mb-0 w-full md:w-1/3">
                    <Title level={3} className="text-sky-400 mb-4">Zupay</Title>
                    <Text className="block mb-4 text-black-300">
                        Discover a new way to manage your tasks with Zupay. We provide innovative solutions to help you stay productive and organized.
                    </Text>
                    <Button type="primary" className="bg-blue-500 hover:bg-blue-600" href="/contact">Contact Us</Button>
                </div>

                {/* Links Section */}
                <div className="mb-8 md:mb-0 w-full md:w-1/3">
                    <Title level={4} className="text-blue-400 mb-4">Quick Links</Title>
                    <ul className="list-none p-0">
                        <li><a href="/about" className="text-black-300 hover:text-blue-400">About Us</a></li>
                        <li><a href="/services" className="text-black-300 hover:text-blue-400">Services</a></li>
                        <li><a href="/blog" className="text-black-300 hover:text-blue-400">Blog</a></li>
                        <li><a href="/careers" className="text-black-300 hover:text-blue-400">Careers</a></li>
                        <li><a href="/support" className="text-black-300 hover:text-blue-400">Support</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="w-full md:w-1/3">
                    <Title level={4} className="text-blue-400 mb-4">Follow Us</Title>
                    <Space size="large">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400">
                            <FacebookOutlined style={{ fontSize: '24px' }} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400">
                            <TwitterOutlined style={{ fontSize: '24px' }} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400">
                            <LinkedinOutlined style={{ fontSize: '24px' }} />
                        </a>
                    </Space>
                </div>
            </div>
            <Divider className="border-gray-600 my-8" />
            <div className="text-center">
                <Text className="text-gray-400">© 2024 Zupay, Inc. All rights reserved.</Text>
            </div>
        </Footer>
    );
};

export default FooterComponent;
