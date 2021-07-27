import React, { useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

const RELATIONSHIP_STATUES = ['Single', 'Committed', 'Married', 'Divorced'];

const SearchFilters = ({
    workFilters,
    educationFilters,
    hometownFilters,
    setQueryParams,
    searchParams,
}) => {
    const [hometown, setHomeTown] = useState('');
    const [work, setWork] = useState('');
    const [education, setEducation] = useState('');
    const [gender, setGender] = useState('');
    const [realtionshipStatus, setRelationshipStatus] = useState('');
    const initialQueryParams = new URLSearchParams({
        search: searchParams,
    });

    const searchFormSubmitHandler = (e) => {
        e.preventDefault();
        const updatedQueryParams = new URLSearchParams(initialQueryParams);
        if (hometown) updatedQueryParams.append('hometown', hometown);
        if (work) updatedQueryParams.append('work', work);
        if (education) updatedQueryParams.append('education', education);
        if (gender) updatedQueryParams.append('gender', gender);
        if (realtionshipStatus)
            updatedQueryParams.append(
                'relationship_status',
                realtionshipStatus
            );
        setQueryParams(updatedQueryParams);
    };

    const searchFormResetHandler = (e) => {
        setQueryParams(initialQueryParams);
    };

    return (
        <Card>
            <Card.Header>Search Filters</Card.Header>
            <Card.Body>
                <Form
                    onSubmit={searchFormSubmitHandler}
                    onReset={searchFormResetHandler}
                >
                    <Form.Group className="mb-3">
                        <Form.Label>Hometown</Form.Label>
                        <Form.Control
                            as="select"
                            name="hometown"
                            defaultValue={
                                hometown === '' ? 'Select City' : hometown
                            }
                            onChange={(e) => setHomeTown(e.target.value)}
                        >
                            <option disabled>Select City</option>
                            {hometownFilters.map((city, index) => (
                                <option value={city} key={city}>
                                    {city}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Education</Form.Label>
                        <Form.Control
                            as="select"
                            name="education"
                            defaultValue={
                                education === ''
                                    ? 'Select Education'
                                    : education
                            }
                            onChange={(e) => setEducation(e.target.value)}
                        >
                            <option disabled>Select Education</option>
                            {educationFilters.map((education, index) => (
                                <option value={education} key={education}>
                                    {education}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Work</Form.Label>
                        <Form.Control
                            as="select"
                            name="work"
                            defaultValue={work === '' ? 'Select Work' : work}
                            onChange={(e) => setWork(e.target.value)}
                        >
                            <option disabled>Select Work</option>
                            {workFilters.map((work, index) => (
                                <option value={work} key={work}>
                                    {work}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-0">
                        <Form.Label className="mb-0">Gender: </Form.Label>

                        <Row>
                            <Col className="col-auto">
                                <Form.Check
                                    inline
                                    label="Male"
                                    type="radio"
                                    value="Male"
                                    name="gender"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </Col>
                            <Col className="col-auto">
                                <Form.Check
                                    inline
                                    label="Female"
                                    type="radio"
                                    value="Female"
                                    name="gender"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </Col>
                            <Col className="col-auto">
                                <Form.Check
                                    inline
                                    label="Others"
                                    type="radio"
                                    value="Others"
                                    name="gender"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Relationship Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="relationship_status"
                            defaultValue={
                                realtionshipStatus === ''
                                    ? 'Select Relationship Status'
                                    : realtionshipStatus
                            }
                            onChange={(e) =>
                                setRelationshipStatus(e.target.value)
                            }
                        >
                            <option disabled>Select Relationship Status</option>
                            {RELATIONSHIP_STATUES.map(
                                (relationship_status, index) => (
                                    <option
                                        value={relationship_status}
                                        key={relationship_status}
                                    >
                                        {relationship_status}
                                    </option>
                                )
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Row className="justify-content-center">
                        <Col className="col-auto">
                            <Button type="submit" variant="primary">
                                Apply Filters
                            </Button>
                        </Col>
                        <Col className="col-auto">
                            <Button type="reset" variant="danger">
                                Reset Filters
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default SearchFilters;
