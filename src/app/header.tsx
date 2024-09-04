import styles from "@/css/Main/header.module.css"
import Link from "next/link";

const Header = () => {

    return(
        <div className={styles.container}>
            <Link href="/" className={`link ${styles.title}`}>Team Waggle</Link>
            <div className={styles.menubar}>
                <Link className={`link ${styles.menu}`} href="/login">소셜로그인</Link>
                <Link className={`link ${styles.menu}`} href="">소셜로그인</Link>
                <Link className={`link ${styles.menu}`} href="">소셜로그인</Link>
            </div>
        </div>
    )
}

export default Header;