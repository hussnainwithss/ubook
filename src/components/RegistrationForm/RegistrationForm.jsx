import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';

const RegistrationForm = () => {
    return (
        <div className="register-main">
            <h3>Register Now</h3>
            <hr />
            <Form>
                <Form.Row>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="first-name"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="last-name"
                            required
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="password1"
                            required
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} className="mb-0">
                        <Form.Label className="mb-0">Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Birthday"
                            name="birthday"
                            max={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Label className="mb-0">Gender: </Form.Label>

                <Form.Group className="mb-0">
                    <Form.Check
                        inline
                        label="Male"
                        type="radio"
                        value="Male"
                        name="gender"
                        required
                    />
                    <Form.Check
                        inline
                        label="Female"
                        type="radio"
                        value="Female"
                        name="gender"
                    />
                    <Form.Check
                        inline
                        label="Others"
                        type="radio"
                        value="Others"
                        name="gender"
                    />
                </Form.Group>
                <Form.Text className="text-muted">
                    By clicking Sign Up, you agree to our Terms and that you
                    have read our Data Use Policy, including our Cookie Use.
                </Form.Text>
                <Form.Group>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default RegistrationForm;
