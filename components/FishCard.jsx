import Image from "next/image";
import styles from "../styles/FishCard.module.css";
import Link from "next/link";

const FishCard = ({ fish }) => {
  

  return (
    <div className={styles.container}>
      <Link href={`/product/${fish._id}`} passHref>
        <Image src={fish.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{fish.title}</h1>
      <span className={styles.price}>{fish.prices[0]} บาท</span>
      <p className={styles.desc}>{fish.desc}</p>
    </div>
  );
};

export default FishCard;
