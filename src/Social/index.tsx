import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import "./Social.scss";
import { PostInterface } from '../interfaces/PostInterface';
import { GET } from './getPosts';
import { defaultApplication } from '../UserApplications';
import { Post } from '../components/Post/Post';
import { Loader } from '../components/Loader/Loader';

const defaultPost = {
    firstName: "",
    lastName: "",
    application: defaultApplication
}

export const Social: React.FC = () => {

    const [posts, setPosts] = useState<PostInterface[]>([defaultPost]);
    const [page, setPage] = useState<number>(0);
    const [blockFurtherRequests, setBlockFurtherRequests] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const getPosts = async () => {
        setLoading(true);
        const res = await GET(page);
        console.log(res.posts);
        if (res.posts.length == 0) {
            setBlockFurtherRequests(true);
        }
        setPosts([...posts, ...res.posts]);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
        document.title = "Job Status Tracker | Social";
    }, [])

    useEffect(() => {
        // Scroll event listener
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [posts]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
        if (!blockFurtherRequests) {
            getPosts();
        }
    };

    return (
        <Layout showSidebar={true} currentPage='social'>
            <div className='social-container'>
                <div className='social-header'>
                    <h1 className='social-title'>Recent Applications</h1>
                    <p>Explore recent applications and trending companies!</p>
                </div>
                <>
                    {posts.map((post: PostInterface, index: number) => index !== 0 && (
                        <Post firstName={post.firstName} lastName={post.lastName} application={post.application} key={index} />
                    ))}
                </>

                {loading && <Loader />}
                {blockFurtherRequests && <p>You've reached the end!</p>}
            </div>
        </Layout>
    )
}