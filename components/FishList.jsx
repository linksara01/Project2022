import styles from "../styles/FishList.module.css";
import FishCard from "./FishCard";

const FishList = ({fishList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ยินดีต้อนรับสู่ร้านค้าปลาสวยงาม</h1>
      <div className={styles.wrapper}>
        {fishList.map(fish=>(
        <FishCard key={fish._id} fish={fish} />
        ))}
      </div>
    </div>
  );
};

export default FishList;
