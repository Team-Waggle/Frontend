'use client'
import styles from './content.module.css';
import {useState} from 'react';

export interface ContentType {
    title: string;
    body: string;
}

const defaultContent: ContentType = {
    title: "Title",
    body: "Body",
}

const FavoredContent = ({title, body}: ContentType) => {
    const [content, setContent] = useState<ContentType>(defaultContent)

    return(
        <div className={styles.container}>
            <h2>{content.title}</h2>
            <p>{content.body}</p>
        </div>
    )
}

export default FavoredContent;