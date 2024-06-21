import React, { useState, useEffect, useContext } from 'react';
import { Layout } from '../components/Layout';
import styles from "./Login.module.scss";
import TextField from '@mui/material/TextField';
import CheckBox from '@mui/material/Checkbox';
import { Loader } from '../components/Loader/Loader';
import { POST } from './getAuth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { GET_AUTH } from '../utils/checkAuth';

export const Login: React.FC = () => {


    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [remember, setRemember] = useState(true);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const tryInitialAuth = async () => {
            const res = await GET_AUTH();
            if (res.status === 200) {
                setUser(res.user);
                navigate("/dashboard")
            }
        }
        tryInitialAuth();
        document.title = "Job Status Tracker | Login";
    }, [navigate, setUser]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                submitCredentials();
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [email, password, remember]);

    const submitCredentials = async () => {
        setLoading(true);
        setFailureMessage("");
        const res = await POST(email, password, remember);
        console.log(res.status, res.message);
        if (res.status === 200) {
            setUser(res.user);
            navigate("/dashboard");
        }
        else {
            setFailureMessage(res.message);
        }
        setLoading(false);
    }


    return (
        <Layout showNav showNavItems={false}>
            <title>
                Job Tracker | Login
            </title>
            <section className={styles.container}>
                <div className={styles.formContainer}>
                    <h1 className={styles.formHeading}>Welcome Back</h1>
                    <TextField onChange={e => setEmail(e.target.value)} className={styles.formInput} label="Email" variant="outlined"></TextField>
                    <TextField onChange={e => setPassword(e.target.value)} className={styles.formInput} type="password" label="Password" variant="outlined"></TextField>
                    <div className={styles.rememberMeRow}>
                        <div className={styles.checkboxContainer}>
                            <CheckBox onClick={() => setRemember(!remember)} className={styles.checkbox} checked={remember}></CheckBox><span>Remember me</span>
                        </div>
                        <span className={styles.forgotPassword}>Forgot Password?</span>
                    </div>
                    <button onClick={submitCredentials} className={styles.submitButton}>Sign In</button>
                    <div className={styles.registerContainer}>
                        <span>Don't have an account yet?</span>
                        <span className={styles.signupLink}>Sign up now</span>
                    </div>
                    <div className={styles.loaderContainer}>
                        {loading && <Loader />}
                        {failureMessage}
                    </div>
                </div>
            </section>
        </Layout>
    )
}