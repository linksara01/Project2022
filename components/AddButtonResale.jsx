import styles from "../styles/AddResale.module.css";

const AddButtonResale = ({setClose1}) => {
  return (
    <div onClick={() => setClose1(false)} className={styles.mainAddButton}>
        ขายคืน
    </div>
  );
};

export default AddButtonResale;
