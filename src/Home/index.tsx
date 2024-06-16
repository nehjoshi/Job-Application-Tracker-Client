import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

export const Home = () => {
    useEffect(() => {
        document.title = "Job Status Tracker";
    }, []);
    return (
        <Layout showNav showNavItems={true}>
            <main className={styles.container}>
                <h4 className={styles.preTitle}>Introducing</h4>
                <h1>A <span className={styles.colorOrange}>New</span> Way To Track Your Applications</h1>
                <p className={styles.info}>Tired of making long, unorganized spreadsheets? We've got you
                    covered.</p>
                <Link to="/login" className={styles.tryButton}>Try Now</Link>
            </main>
        </Layout>
    )
}