import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

const RELATIONSHIP_STATUES = ['Single', 'Committed', 'Married', 'Divorced'];
const SearchFilters = ({ cities, educations, works }) => {
    return (
        <Card>
            <Card.Header>Search Filters</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Hometown</Form.Label>
                        <Form.Control
                            as="select"
                            name="city"
                            defaultValue="Select City"
                        >
                            <option disabled>Select City</option>
                            {cities.map((city, index) => (
                                <option value={city} key={city}>
                                    {city}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hometown</Form.Label>
                        <Form.Control
                            as="select"
                            name="education"
                            defaultValue="Select Education"
                        >
                            <option disabled>Select Education</option>
                            {educations.map((education, index) => (
                                <option value={education} key={education}>
                                    {education}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hometown</Form.Label>
                        <Form.Control
                            as="select"
                            name="work"
                            defaultValue="Select Work"
                        >
                            <option disabled>Select Work</option>
                            {works.map((work, index) => (
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
                                />
                            </Col>
                            <Col className="col-auto">
                                <Form.Check
                                    inline
                                    label="Female"
                                    type="radio"
                                    value="Female"
                                    name="gender"
                                />
                            </Col>
                            <Col className="col-auto">
                                <Form.Check
                                    inline
                                    label="Others"
                                    type="radio"
                                    value="Others"
                                    name="gender"
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Relationship Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="work"
                            defaultValue="Select Relationship Status"
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
