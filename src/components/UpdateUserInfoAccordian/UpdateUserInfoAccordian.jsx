import React, { useState } from 'react';
import { Accordion, Card, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import ContextAwareToggle from '../ContextAwareToggle/ContextAwareToggle';

const UpdateUserInfoAccordian = ({ userInfo, userProfileUpdatedHook }) => {
    const RELATIONSHIP_STATUES = ['Single', 'Committed', 'Married', 'Divorced'];
    const TOKEN = '849a631356ad9a6d1ad1cd7c28607eb764f83d3a';

    const [first_name, setFirstName] = useState(userInfo.first_name);
    const [last_name, setLastName] = useState(userInfo.last_name);
    const [email, setEmail] = useState(userInfo.email);
    const [bio, setBio] = useState(userInfo.profile.bio);
    const [education, setEducation] = useState(userInfo.profile.education);
    const [work, setWork] = useState(userInfo.profile.work);
    const [hometown, setHometown] = useState(userInfo.profile.hometown);
    const [gender, setGender] = useState(userInfo.profile.gender);
    const [birthday, setBirthday] = useState(userInfo.profile.birthday);
    const [relationship_status, setRelationshipStatus] = useState(
        userInfo.profile.relationship_status
    );
    const [current_password, setCurrentPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [confirm_new_password, setConfirmPassword] = useState('');
    const [updatedUserInfoData, setUpdatedUserInfoData] = useState({});
    const verifyNewPassword = () => {
        if (current_password === new_password) {
            return false;
        }
        if (new_password !== confirm_new_password) {
            return false;
        }
        return true;
    };

    const updateProfileInfoHandler = (e) => {
        e.preventDefault();
        if (Object.keys(updatedUserInfoData).length === 0) {
            return;
        }
        axios
            .patch(
                'http://localhost:8000/api/update-profile/',
                updatedUserInfoData,
                {
                    headers: {
                        Authorization: `Token ${TOKEN}`,
                    },
                }
            )
            .then((response) => {
                userProfileUpdatedHook(true);
            });
    };
    const updatePasswordHandler = (e) => {
        e.preventDefault();
        const ValidNewPassword = verifyNewPassword();
        if (!ValidNewPassword) return;

        const newPasswordData = {
            current_password,
            new_password,
            confirm_new_password,
        };
        axios
            .patch(
                'http://localhost:8000/api/change-password/',
                newPasswordData,
                {
                    headers: {
                        Authorization: `Token ${TOKEN}`,
                    },
                }
            )
            .then((response) => {
                TOKEN.replace(TOKEN, response.data.token);
            });
    };
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <ContextAwareToggle eventKey="0">
                    Update Profile
                </ContextAwareToggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form onSubmit={updateProfileInfoHandler}>
                            <Form.Row>
                                <Col>
                                    <Form.Group className="mb-2">
                                        <Form.Label>First Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            value={first_name}
                                            onChange={(e) => {
                                                setFirstName(e.target.value);
                                                setUpdatedUserInfoData({
                                                    ...updatedUserInfoData,
                                                    first_name: e.target.value,
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Last Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last Name"
                                            value={last_name}
                                            onChange={(e) => {
                                                setLastName(e.target.value);
                                                setUpdatedUserInfoData({
                                                    ...updatedUserInfoData,
                                                    last_name: e.target.value,
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Group className="mb-2">
                                <Form.Label>E-mail Address:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="E-mail Address"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setUpdatedUserInfoData({
                                            ...updatedUserInfoData,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Home Town:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Home Town"
                                    value={hometown}
                                    onChange={(e) => {
                                        setHometown(e.target.value);
                                        setUpdatedUserInfoData({});
                                        setUpdatedUserInfoData({
                                            ...updatedUserInfoData,
                                            profile: {
                                                ...updatedUserInfoData.profile,
                                                hometown: e.target.value,
                                            },
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Education:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Education"
                                    value={education}
                                    onChange={(e) => {
                                        setEducation(e.target.value);
                                        setUpdatedUserInfoData({
                                            ...updatedUserInfoData,
                                            profile: {
                                                ...updatedUserInfoData.profile,
                                                education: e.target.value,
                                            },
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Work:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Work"
                                    value={work}
                                    onChange={(e) => {
                                        setWork(e.target.value);
                                        setUpdatedUserInfoData({
                                            ...updatedUserInfoData,
                                            profile: {
                                                ...updatedUserInfoData.profile,
                                                work: e.target.value,
                                            },
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Bio:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Please Enter Bio"
                                    value={bio}
                                    onChange={(e) => {
                                        setBio(e.target.value);
                                        setUpdatedUserInfoData({
                                            ...updatedUserInfoData,
                                            profile: {
                                                ...updatedUserInfoData.profile,
                                                bio: e.target.value,
                                            },
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-0">
                                <Form.Label className="mb-0">
                                    Gender:
                                </Form.Label>

                                <Row>
                                    <Col className="col-auto">
                                        <Form.Check
                                            inline
                                            label="Male"
                                            type="radio"
                                            value="Male"
                                            checked={gender === 'Male'}
                                            onChange={(e) => {
                                                setGender(e.target.value);
                                                setUpdatedUserInfoData({
                                                    ...updatedUserInfoData,
                                                    profile: {
                                                        ...updatedUserInfoData.profile,
                                                        gender: e.target.value,
                                                    },
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col className="col-auto">
                                        <Form.Check
                                            inline
                                            label="Female"
                                            type="radio"
                                            value="Female"
                                            checked={gender === 'Female'}
                                            onChange={(e) => {
                                                setGender(e.target.value);
                                                setUpdatedUserInfoData({
                                                    ...updatedUserInfoData,
                                                    profile: {
                                                        ...updatedUserInfoData.profile,
                                                        gender: e.target.value,
                                                    },
                                                });
                                            }}
                                        />
                                    </Col>
                                    <Col className="col-auto">
                                        <Form.Check
                                            inline
                                            label="Others"
                                            type="radio"
                                            value="Others"
                                            checked={gender === 'Others'}
                                            onChange={(e) => {
                                                setGender(e.target.value);
                                                setUpdatedUserInfoData({
                                                    ...updatedUserInfoData,
                                                    profile: {
                                                        ...updatedUserInfoData.profile,
                                                        gender: e.target.value,
                                                    },
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label className="mb-0">
                                    Birthday:
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Birthday"
                                    max={new Date().toISOString().split('T')[0]}
                                    value={birthday}
                                    onChange={(e) => {
                                        setBirthday(e.target.value);
                                        setUpdatedUserInfoData({
                                            ...updatedUserInfoData,
                                            profile: {
                                                ...updatedUserInfoData.profile,
                                                birthday: e.target.value,
                                            },
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Relationship Status:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="relationship_status"
                                    defaultValue={
                                        relationship_status === ''
                                            ? 'Select Relationship Status'
                                            : relationship_status
                                    }
                                    onChange={(e) => {
                                        setRelationshipStatus(e.target.value);
                                        setUpdatedUserInfoData({
                                            ...updatedUserInfoData,
                                            profile: {
                                                ...updatedUserInfoData.profile,
                                                relationship_status:
                                                    e.target.value,
                                            },
                                        });
                                    }}
                                >
                                    <option disabled>
                                        Select Relationship Status
                                    </option>
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
                            <Button variant="primary" type="Submit">
                                Update Profile
                            </Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <ContextAwareToggle eventKey="1">
                    Update Password
                </ContextAwareToggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <Form onSubmit={updatePasswordHandler}>
                            <Form.Group className="mb-2">
                                <Form.Label>Current Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Current Password"
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>New Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter New Password"
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                                <Form.Text className="text-muted">
                                    <ul>
                                        <li>
                                            Your password can’t be too similar
                                            to your other personal information.
                                        </li>
                                        <li>
                                            Your password must contain at least
                                            8 characters.
                                        </li>
                                        <li>
                                            Your password can’t be a commonly
                                            used password.
                                        </li>
                                        <li>
                                            Your password can’t be entirely
                                            numeric.
                                        </li>
                                    </ul>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Confirm New Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm New Password"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Button variant="primary" type="Submit">
                                Update Password
                            </Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default UpdateUserInfoAccordian;
