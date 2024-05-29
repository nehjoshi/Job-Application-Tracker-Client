import React from 'react';
import "./Post.scss";
import { PostInterface } from '../../interfaces/PostInterface';

export const Post: React.FC<PostInterface> = ({firstName, lastName, application}) => {
    return (
        <div className='post-container'>
            <span>{application.dateApplied?.toString().slice(0, 10)}</span>
            <span><b>{firstName} {lastName}</b> recently applied to </span>
            <h2><b className='post-company-name'>{application.companyName}</b></h2>
            <span>For the role:</span>
            <h2>{application.positionTitle}</h2>
            <h3>Compensation: {application.compensation}</h3>
            <h4>Location: {application.location}</h4>
        </div>
    )
}