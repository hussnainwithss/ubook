import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import ProfileCard from '../ProfileCard/ProfileCard';
import SearchFilters from '../SearchFilters/SearchFilters';

const SEARCH_RESULTS = [
    {
        name: 'Hussnain Ahmad',
        hometown: 'Gujranwala',
        gender: 'Male',
        age: '22',
        education: 'LUMS',
    },
    {
        name: 'Hussnain Ahmad',
        hometown: 'Lahore',
        gender: 'Male',
        age: '20',
        work: 'Arbisoft',
    },
    {
        name: 'Test User',
        hometown: 'Islamabad',
        gender: 'Male',
        age: '20',
        relationship_status: 'Single',
    },
];

const Search = () => {
    let query_params = useQuery();
    let search_param = query_params.get('search');
    const [searchResults, setSearchResults] = useState(null);
    const getSearchResults = () => {
        const TOKEN = '89e4473a23e46a19218891280e7e18651c351a5e';
        const requestData = {
            headers: {
                Authorization: `Token ${TOKEN}`,
            },
            params: {
                search: search_param,
            },
        };
        axios
            .get('http://localhost:8000/api/search/', requestData)
            .then((response) => {
                setSearchResults(searchResults);
                console.log(response.data);
                console.log(searchResults);
            });
    };
    useEffect(getSearchResults, [searchResults, search_param]);
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const getSearchFilters = () => {
        let search_filters = {};
        search_filters['works'] = SEARCH_RESULTS.filter((search_result) => {
            return 'work' in search_result;
        });
        search_filters['works'] = SEARCH_RESULTS.map((search_result) => {
            if ('work' in search_result) return search_result.work;
        }).filter((search_result) => {
            return search_result !== undefined;
        });
        search_filters['educations'] = SEARCH_RESULTS.map((search_result) => {
            if ('education' in search_result) return search_result.education;
        }).filter((search_result) => {
            return search_result !== undefined;
        });
        search_filters['cities'] = SEARCH_RESULTS.map((search_result) => {
            if ('hometown' in search_result) return search_result.hometown;
        }).filter((search_result) => {
            return search_result !== undefined;
        });
        return search_filters;
    };
    const { cities, educations, works } = getSearchFilters();
    return (
        <div>
            <NavBar isLoggedIn={true} />
            <Container className="register-main">
                <Row>
                    <Col md="4">
                        <SearchFilters
                            cities={cities}
                            educations={educations}
                            works={works}
                        />
                    </Col>
                    <Col md="8">
                        <h4>
                            {`${
                                searchResults && searchResults.length
                            } Search Result(s) for ${search_param}`}
                        </h4>
                        <div>
                            {searchResults &&
                                searchResults.map((user_profile, index) => {
                                    console.log(user_profile);
                                    {
                                        /* <ProfileCard
                                        username={user_profile.firstname}
                                        hometown={user_profile.profile.hometown}
                                        age={user_profile.profile__age}
                                        gender={user_profile.profile.gender}
                                        extras={
                                            user_profile.education
                                                ? user_profile.profile.education
                                                : user_profile.profile.work
                                                ? user_profile.profile.work
                                                : user_profile.profile
                                                      .relationship_status
                                        }
                                        key={`${user_profile.profile.name}-extras-${user_profile.profile__age}`}
                                    /> */
                                    }
                                })}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Search;
