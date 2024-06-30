import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { GET_AUTH } from '../../utils/checkAuth';
import { useNavigate } from 'react-router-dom';

export const useTryInitialAuth = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        const tryInitialAuth = async () => {
            console.log("Trying Initial Auth");
            const res = await GET_AUTH();
            if (res.status === 200) {
                setUser(res.user);
                navigate("/dashboard")
            }
        }
        !user && tryInitialAuth();
        document.title = "Job Status Tracker | Dashboard";
    }, [user, navigate, setUser]);
}