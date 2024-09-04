'use client'
import Image from 'next/image';
import styles from './page.module.css';

const Login = () => {

    const OnClick = (e: React.MouseEvent<HTMLImageElement>) => {
        
    }

    return(
        <div className={styles.container}>
            <h2>소셜로그인</h2>
            <div className={styles.kakao}>
                <Image className={styles.image} onClick={OnClick} src="/login/kakao.png" alt="No Source" fill />
            </div>
        </div>
    )
}

export default Login;