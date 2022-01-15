import styles from "../../styles/CResale.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

const cresale = ({resales}) => {
  const [resaleList, setResaleList] = useState(resales);
  const status = ["กำลังตรวจสอบรายการ","กำลังไปรับของ", "ขายคืนสำเร็จ", "ขายคืนสำเร็จ"];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/resales/" + id
      );
      setResaleList(resaleList.filter((resale) => resale._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = resaleList.filter((resale) => resale._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put("http://localhost:3000/api/resales/" + id, {
        status: currentStatus + 1,
      });
      setResaleList([
        res.data,
        ...resaleList.filter((resale) => resale._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>รายการขายคืน</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>รูป</th>
              <th>ID Resale</th>
              <th>ID Order</th>
              <th>ชื่อปลา</th>
              <th>ชื่อลูกค้า</th>
              <th>ที่อยู่</th>
              <th>ขนาดเล็ก</th>
              <th>ขนาดกลาง</th>
              <th>ขนาดใหญ่</th>
              <th>จำนวน</th>
              <th>สถานะ</th>
            </tr>
          </tbody>
          {resales.map((resale) => (
            <tbody key={resales._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={resale.img}
                    width={100}
                    height={100}
                    objectfit="cover"
                    alt=""
                  />
                </td>
                <td>{resale._id.slice(0,5)}...</td>
                <td>{resale.orderId} </td>
                <td>{resale.title}</td>
                <td>{resale.customer} </td>
                <td>{resale.address} </td>
                <td className={styles.prices}>{resale.prices[0]} </td>
                <td className={styles.prices}>{resale.prices[1]} </td>
                <td className={styles.prices}>{resale.prices[2]} </td>
                <td>{resale.amount} ตัว </td>
                <td>{status[resale.status]}</td>
                <td>
                <Link href={`/resales/${resale._id}`} passHref>
                  <button>ดูเพิ่มเติม</button>
                </Link>
                </td>
                <td>
                  <button onClick={() => handleStatus(resale._id)} className={styles.button}>
                    เลื่อนสถานะ
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(resale._id)}
                  >
                    ยกเลิก
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const resaleRes = await axios.get("http://localhost:3000/api/resales");

  return {
    props: {
      resales: resaleRes.data,
    },
  };
};

export default cresale;
