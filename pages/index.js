import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import FishList from "../components/FishList";
import styles from "../styles/Home.module.css";

export default function Home({ fishList,admin }) {
  const [close,setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>ร้านซื้อขายปลาสวยงาม</title>
        <meta name="description" content="ซื้อขายปลาสวยงามในหาดใหญ่" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <FishList fishList={fishList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.Token) {
    admin = true;
  }
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      fishList: res.data,
      admin
    },
  };
};
