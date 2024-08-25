import React from 'react';
import { Button, Result } from 'antd';
import 'antd/dist/reset.css';
import 'tailwindcss/tailwind.css';

export const NotFound = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you are looking for does not exist."
                extra={<Button type="primary" href="/">Back to Home</Button>}
                className="max-w-md mx-auto"
            />
        </div>
    );
};

export const Unauthorized = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" href="/">Back to Home</Button>}
                className="max-w-md mx-auto"
            />
        </div>
    );
};
