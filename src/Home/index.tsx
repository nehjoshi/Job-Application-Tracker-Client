import { Layout } from '../components/Layout';
import './Home.scss';
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <Layout showNav showNavItems={true}>
            <main className='container'>
                <h4 className='pre-title'>Introducing</h4>
                <h1>A <span id="color-orange">New</span> Way To Track Your Applications</h1>
                <p className='info'>Tired of making long, unorganized spreadsheets? We've got you
                    covered.</p>
                <Link to="/login" className="try-button">Try Now</Link>
            </main>
        </Layout>
    )
}