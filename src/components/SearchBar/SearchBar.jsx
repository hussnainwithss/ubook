import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Form } from 'react-bootstrap';

const SearchBar = ({ searchParams }) => {
    const [searchParam, setsearchParam] = useState(searchParams);
    const [redirectToSearchPage, setRedirectToSearchPage] = useState(false);

    const handleSubmit = (e) => {
        setRedirectToSearchPage(true);
        e.preventDefault();
    };

    const updateSearchParam = (e) => {
        setsearchParam(e.target.value);
    };

    if (redirectToSearchPage === true)
        return <Redirect to={`/search/?search=${searchParam}`} />;

    return (
        <Form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
            <Form.Control
                type="text"
                name="search"
                placeholder="Search UBook"
                onChange={(e) => updateSearchParam(e)}
                value={searchParam ? searchParam : ''}
            />
        </Form>
    );
};

export default SearchBar;
