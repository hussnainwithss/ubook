import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import NavBar from 'components/NavBar/NavBar';
import ProfileCard from 'components/ProfileCard/ProfileCard';
import SearchFilters from 'components/SearchFilters/SearchFilters';
import useQuery from 'utils/useQuery';
import { userSearch } from 'api';

const Search = () => {
    const [queryParams, setQueryParams] = useState(useQuery());
    const [searchResults, setSearchResults] = useState([]);
    const [hometownFilters, setHometownFilters] = useState([]);
    const [educationFilters, setEducationFilters] = useState([]);
    const [workFilters, setWorkFilters] = useState([]);
    const search_param = queryParams.get('search');

    const getFiltersFromData = (filter_name, data) => {
        return data
            .map((data_obj) => {
                if (filter_name in data_obj.profile)
                    return data_obj.profile[filter_name];
                return '';
            })
            .filter((value, index, original_array) => {
                return original_array.indexOf(value) === index && value !== '';
            });
    };

    const getSearchResults = () => {
        const requestData = {
            search: search_param,
        };
        queryParams.forEach((value, key) => {
            requestData[key] = value;
        });
        userSearch(requestData).then((response) => {
            setSearchResults(response);
            setWorkFilters(getFiltersFromData('work', response));
            setEducationFilters(getFiltersFromData('education', response));
            setHometownFilters(getFiltersFromData('hometown', response));
        });
    };
    useEffect(getSearchResults, [queryParams]);

    return (
        <div>
            <NavBar />
            <Container className="register-main">
                <Row>
                    <Col md="4">
                        <SearchFilters
                            hometownFilters={hometownFilters && hometownFilters}
                            educationFilters={
                                educationFilters && educationFilters
                            }
                            workFilters={workFilters && workFilters}
                            setQueryParams={setQueryParams}
                            searchParams={queryParams.get('search')}
                        />
                    </Col>
                    <Col md="8">
                        <h4>
                            {`${searchResults.length} Search Result(s) for ${search_param}`}
                        </h4>
                        <div>
                            {searchResults.map((user, _) => (
                                <ProfileCard
                                    id={user.id}
                                    picture={user.profile.profile_picture}
                                    name={user.first_name}
                                    hometown={user.profile.hometown}
                                    age={user.profile__age}
                                    gender={user.profile.gender}
                                    extras={
                                        user.education
                                            ? user.profile.education
                                            : user.profile.work
                                            ? user.profile.work
                                            : user.profile.relationship_status
                                    }
                                    key={`${user.first_name}-id-${user.id}`}
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
