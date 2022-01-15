import styles from "../styles/Add.module.css";

const AddButton = ({setClose}) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
        เพิ่มปลา
    </div>
  );
};

export default AddButton;
