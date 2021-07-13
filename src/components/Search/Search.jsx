import React from 'react';
import { useLocation } from 'react-router';
import { Container, Col, Row } from 'react-bootstrap';
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
const Search = () => {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
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
                                SEARCH_RESULTS.length
                            } Search Result(s) for ${query.get('search')}`}
                        </h4>
                        <div>
                            {SEARCH_RESULTS.map((user_profile, index) => (
                                <ProfileCard
                                    name={user_profile.name}
                                    hometown={user_profile.hometown}
                                    age={user_profile.age}
                                    gender={user_profile.gender}
                                    extras={
                                        user_profile.education
                                            ? user_profile.education
                                            : user_profile.work
                                            ? user_profile.work
                                            : user_profile.relationship_status
                                    }
                                    key={`${user_profile.name}-extras-${user_profile.age}`}
                                />
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Search;
