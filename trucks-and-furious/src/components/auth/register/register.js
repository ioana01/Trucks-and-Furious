import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/contexts";
import { Link, useHistory } from "react-router-dom";
import { database } from "../../../firebase";
import './register.css';

export default function SignUp() {
    const nameRef = useRef();
    const userTypeRef = useRef();
    const userRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        const userData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            userType: userTypeRef.current.value,
        }
        database.ref('users').push(userData);
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match");
        }
    
        try {
          setError("");
          setLoading(true);
          await signup(emailRef.current.value, passwordRef.current.value);
          history.push("/");
        } catch(error) {
            setError(error.message);
        }
    
        setLoading(false);
    }

    return (
        <>
            <Card id='card-container-signup'>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" ref={nameRef} required />
                        </Form.Group>

                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="userType">
                            <Form.Label>User type</Form.Label> <br></br>
                            <Form.Select ref={userTypeRef} required>
                                <option>Select an option</option>
                                <option>transportator</option>
                                <option>expeditor</option>
                                <option>admin</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group id="password-confirm" style={{ marginBottom: "20px" }}>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        <Button disabled={loading} className="w-100 auth-button" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            
            <div className="w-100 text-center mt-2" id='login-check'>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}