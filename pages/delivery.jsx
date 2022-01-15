import styles from "../styles/Delivery.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

const delivery = ({ orders,resales }) => {
  const [resaleList, setResaleList] = useState(resales);
  const [orderList, setOrderList] = useState(orders);
  const status = ["กำลังจัดส่ง","กำลังจัดส่ง", "จัดส่งสำเร็จแล้ว"];

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>คำสั่งซื้อ</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>รหัสการสั่งซื้อ</th>
              <th>ชื่อลูกค้า</th>
              <th>รวม</th>
              <th>วิธีการชำระเงิน</th>
              <th>สถานะการจัดส่ง</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0,5)}...</td>
                <td>{order.customer}</td>
                <td>{order.total} บาท</td>
                <td>
                  {order.method === 0 ? (
                    <span>จ่ายปลายทาง</span>
                  ) : (
                    <span>Paypal</span>
                  )}
                </td>
                <td>{status[order.status]}</td>
                <td>
                <Link href={`/orders/${order._id}`} passHref>
                <button>ดูเพิ่มเติม</button>
              </Link>
              </td>
              </tr>

            </tbody>
          ))}
        </table>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>ขายคืน</h1>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>รหัสการสั่งซื้อ</th>
                <th>รูป</th>
                <th>ชื่อปลา</th>
                <th>ชื่อลูกค้า</th>
                <th>ราคา</th>
                <th>จำนวน</th>
              </tr>
            </tbody>
            {resaleList.map((resale) => (
              <tbody key={resale._id}>
                <tr className={styles.trTitle}>
                  <td>{resale._id.slice(0,5)}...</td>
                 <td> <Image src={resale.img} alt="" width="100px" height="69px" />
                 </td>
                  <td>{resale.title}</td>
                  <td>{resale.customer}</td>
                  <td>{resale.prices} บาท</td>
                  <td>{resale.amount} ตัว</td>
                  <td>{status[resale.status]}</td>
                  <td>
                  <Link href={`/resales/${resale._id}`} passHref>
                  <button>ดูเพิ่มเติม</button>
                </Link>
                </td>
                </tr>             
              </tbody>
            ))}
          </table>
        </div>
     
    </div>
  );
};
export const getServerSideProps = async () => {
  const resaleRes = await axios.get("http://localhost:3000/api/resales");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      resales: resaleRes.data,
    },
  };
};

export default delivery;
