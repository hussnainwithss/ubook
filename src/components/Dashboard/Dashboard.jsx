import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UserProfile from './UserProfile';
import {
    loadUserPending,
    loadUserSuccess,
    loadUserFailed,
} from '../../redux/userSlice';
const Dashboard = () => {
    const TOKEN = '849a631356ad9a6d1ad1cd7c28607eb764f83d3a';
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const { user: LoggedInUser } = useSelector((state) => state.user);
    const [newPost, setNewPost] = useState({});
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
            });
    };
    useEffect(getPostsData, [newPost, id]);

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
