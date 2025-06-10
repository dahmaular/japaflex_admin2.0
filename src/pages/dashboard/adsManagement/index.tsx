import { ReactComponent as CheckIcon } from "../../../assets/create-add.svg";
import styles from "./createAdd.module.css";

export default function CreateAdd() {
  return (
    <>
      <div>Create Add</div>
      <div className={styles.createAdd}>
        <CheckIcon />
        <button>Create Add</button>
      </div>
    </>
  );
}
