import styles from "../styles/Add.module.css";

const EditButton = ({setClose2}) => {
  return (
    <div onClick={() => setClose2(false)} className={styles.mainAddButton}>
        เพิ่มปลา
    </div>
  );
};

export default EditButton;
