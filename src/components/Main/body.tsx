import styles from './body.module.css';
import MainContent from './content';

const MainBody = () => {

    return(
        <div className={styles.container}>
            <div className={styles.upperbody}>
                {/*<Image className={styles.image} src={"/login/kakao.png"} alt={"No Source"} fill /> */}
                <h2>🔥이번주 와글 인기글</h2>
                <MainContent title="Title" body="body"/>
            </div>
        </div>
    )
}

export default MainBody;