'use client'
import Link from 'next/link';
import styles from './body.module.css';
import FavoredContent from './content';
import {useState} from 'react';
import MainContent from './maincontent';

export enum BoardType {
    total = "total",
    project = "project",
    study = "study"
}


const MainBody = () => {

    const [board, setBoard] = useState<BoardType>(BoardType.total);

    const OnClick = (e: React.MouseEvent<HTMLButtonElement>, type: BoardType) => {
        setBoard(type);
    }

    return(
        <div className={styles.container}>
            <div className={styles.upperbody}>
                {/*<Image className={styles.image} src={"/login/kakao.png"} alt={"No Source"} fill /> */}
                <h2>🔥이번주 와글 인기글</h2>
                <FavoredContent title="Title" body="body"/>
            </div>
            <div className={styles.mainbody}>
                <div className={styles.category}>
                    <button onClick={(e)=>{OnClick(e, BoardType.total)}} className={`${styles.link} link`}>전체</button>
                    <button onClick={(e)=>{OnClick(e, BoardType.project)}} className={`${styles.link} link`}>프로젝트</button>
                    <button onClick={(e)=>{OnClick(e, BoardType.study)}} className={`${styles.link} link`}>스터디</button>
                </div>
                <div>
                    <MainContent type={board}/>
                </div>
            </div>
        </div>
    )
}

export default MainBody;