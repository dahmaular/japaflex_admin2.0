import { ReactComponent as CheckIcon } from "../../../assets/create-add.svg";
import { Link } from "react-router-dom";
import styles from "./createAdd.module.css";

export default function CreateAdd() {
  return (
    <>
      <div className={styles.headerFlex}>
        <div>
          <h1>ADS Management</h1>
          <p>Here is a view of your messages</p>
        </div>

        <Link to="/ads-management/create" className={styles.createAddLink}>
          <div className={styles.createAdd}>
            <CheckIcon />
            <button>Create Add</button>
          </div>
        </Link>
      </div>
    </>
  );
}
