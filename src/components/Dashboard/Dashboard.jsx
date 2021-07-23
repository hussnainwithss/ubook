import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UserProfile from './UserProfile';
import {
    loadUserPending,
    loadUserSuccess,
    loadUserFailed,
    updateUserPosts,
} from '../../redux/userSlice';
import { useCookies } from 'react-cookie';
const Dashboard = () => {
    const [cookies] = useCookies(['authToken']);
    const TOKEN = cookies.authToken;
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const { user: LoggedInUser, posts: LoggedInUserPosts } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();

    const getPostsData = () => {
        const requestData = {
            headers: {
                Authorization: `Token ${TOKEN}`,
            },
        };
        if (id) {
            requestData.params = {
                id,
            };
        }
        axios
            .get('http://localhost:8000/api/post/', requestData)
            .then((response) => {
                setPosts(response.data);
                if (!id) updateUserPosts(response.data);
            });
    };
    useEffect(getPostsData, [LoggedInUserPosts, id]);

    const getUserData = () => {
        if (!id) dispatch(loadUserPending());
        const requestData = {
            headers: {
                Authorization: `Token ${TOKEN}`,
            },
        };
        if (id) {
            requestData.params = {
                id,
            };
        }
        axios
            .get('http://localhost:8000/api/user/', requestData)
            .then((response) => {
                if (!id) dispatch(loadUserSuccess(response.data));
                setUser(response.data);
            });
    };
    useEffect(getUserData, [id]);

    return (
        <>
            {id !== undefined
                ? user && (
                      <UserProfile
                          user={user}
                          posts={posts}
                          allowEdit={false}
                      />
                  )
                : LoggedInUser && (
                      <UserProfile
                          user={LoggedInUser}
                          posts={posts}
                          allowEdit={true}
                      />
                  )}
        </>
    );
};

export default Dashboard;
