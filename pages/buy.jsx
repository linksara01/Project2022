import axios from "axios";
import Head from "next/head";
import FishList from "../components/FishList";
import styles from "../styles/Home.module.css";

export default function Buy({ fishList }) {
  return (
    <div className={styles.container}>
      <FishList fishList={fishList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      fishList: res.data,
    },
  };
};
