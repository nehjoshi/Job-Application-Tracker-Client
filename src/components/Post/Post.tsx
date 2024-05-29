import React from 'react';
import "./Post.scss";
import { PostInterface } from '../../interfaces/PostInterface';

export const Post: React.FC<PostInterface> = ({firstName, lastName, application}) => {
    return (
        <div className='post-container'>
            <span>{application.dateApplied?.toString().slice(0, 10)}</span>
            <h1>{firstName} {lastName} recently applied to </h1>
            <h2>{application.companyName}.</h2>
            <h2>{application.compensation}.</h2>
        </div>
    )
}