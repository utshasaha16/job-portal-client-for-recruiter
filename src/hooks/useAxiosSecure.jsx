import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response
        }, error => {
            console.log('Error caught in interceptor', error);

            if (error.status === 401 || error.status === 403) {
                console.log('need to log out the user');
                signOutUser()
                .then(() => {
                    console.log('logged out user');
                    navigate('/signIn');
                }).catch(err => console.log(err))
            }

            return Promise.reject(error)
        })
    }, [])

    return axiosInstance;
};

export default useAxiosSecure;