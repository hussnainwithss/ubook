import { Button, Form } from 'react-bootstrap';

let Login = () => {
    return (
        <Form className="nav white-text">
            <Form.Group className="mr-2 mb-0">
                <Form.Control
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    required
                />
                <Form.Check
                    type="checkbox"
                    label="Remember Me"
                    className="login-bottom-text"
                    name="remember-me"
                />
            </Form.Group>
            <Form.Group className="mr-2 mb-0">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                />
                <Form.Text className="mt-0">
                    <a className="login-bottom-text  white-text " href="/#">
                        Forgot your Password?
                    </a>
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Button variant="success" type="submit" className="btn-success">
                    Login
                </Button>
            </Form.Group>
        </Form>
    );
};

export default Login;
