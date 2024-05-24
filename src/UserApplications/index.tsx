import React, {useEffect, useState} from 'react';
import { Layout } from '../components/Layout';
import { GET } from './getApplications';

export const UserApplications: React.FC = () => {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        GET();
    }, [])


    return (
        <Layout showNavItems>
            <>
            </>
        </Layout>
    )
}