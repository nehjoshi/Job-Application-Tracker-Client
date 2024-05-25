import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import "./Login.scss";
import TextField from '@mui/material/TextField';
import CheckBox from '@mui/material/Checkbox';
import { Loader } from '../components/Loader/Loader';
import { GET, POST } from './getAuth';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {


    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [remember, setRemember] = useState(true);
    const navigate = useNavigate();

    const tryInitialAuth = async () => {
        const res = await GET();
        if (res.status === 200) {
            navigate("/applications")
        }

    }

    useEffect(() => {
        tryInitialAuth();
    }, []);

    const submitCredentials = async () => {
        setLoading(true);
        setFailureMessage("");
        const res = await POST(email, password, remember);
        console.log(res.status, res.message);
        if (res.status === 200) {
            navigate("/applications");
        }
        else {
            setFailureMessage(res.message);
        }
        setLoading(false);
    }


    return (
        <Layout showNav showNavItems={false}>
            <section className='container'>
                <div className="form-container">
                    <h1 className='form-heading'>Welcome Back</h1>
                    <TextField onChange={e => setEmail(e.target.value)} className="form-input" label="Email" variant="outlined"></TextField>
                    <TextField onChange={e => setPassword(e.target.value)} className="form-input" type="password" label="Password" variant="outlined"></TextField>
                    <div className="remember-me-row">
                        <div className="checkbox-container">
                            <CheckBox onClick={() => setRemember(!remember)} className="checkbox" checked={remember}></CheckBox><span>Remember me</span>
                        </div>
                        <span className='forgot-password'>Forgot Password?</span>
                    </div>
                    <button onClick={submitCredentials} className="submit-button">Sign In</button>
                    <div className='register-container'>
                        <span>Don't have an account yet?</span>
                        <span className="signup-link">Sign up now</span>
                    </div>
                    <div className="loader-container">
                        {loading && <Loader />}
                        {failureMessage}
                    </div>
                </div>
            </section>
        </Layout>
    )
}