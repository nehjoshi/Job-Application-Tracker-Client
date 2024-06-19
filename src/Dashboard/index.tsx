import React from 'react';
import styles from './Dashboard.module.scss';
import { Layout } from '../components/Layout';
// import { UserContext } from '../context/UserContext';

export const Dashboard: React.FC = () => {

    // const {user} = useContext(UserContext);

    return (
        <Layout showSidebar>
            <div className={styles.container}>
                <h1>Dashboard</h1>
            </div>
        </Layout>
    )
}