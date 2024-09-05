import { BoardType } from "./body";
import styles from "./maincontent.module.css";

interface Prop {
  type: BoardType;
}

const MainContent = ({ type }: Prop) => {
  

    return(
        <div className={styles.container}>
            <div className={styles.selection}>
              <button>asdf</button>
            </div>
        </div>
    )
};

export default MainContent;
