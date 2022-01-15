import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

const Index = ({ orders, products }) => {
  const [fishList, setFishList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["กำลังจัดส่ง", "จัดส่งสำเร็จแล้ว"];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setFishList(fishList.filter((fish) => fish._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleOrderDelete = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/orders/" + id
      );
      setOrderList(orderList.filter((order) => order._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>สินค้า</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>รูป</th>
              <th>รหัส</th>
              <th>ชื่อปลา</th>
              <th>ราคา</th>
            </tr>
          </tbody>
          {fishList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectfit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>{product.prices[0]} บาท</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    ลบ
                  </button>
                </td>
                <td>
                <Link href={`/product/${product._id}`} passHref>
                  <button>ดูเพิ่มเติม</button>
                </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
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
              <th>สถานะ</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>{order.total} บาท</td>
                <td>
                  {order.method === 0 ? (
                    <span>จ่ายเงินสด</span>
                  ) : (
                    <span>Paypal</span>
                  )}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>ถัดไป</button>
                  <button
                    className={styles.button}
                    onClick={() => handleOrderDelete(order._id)}
                  >
                    ลบ
                  </button>
                </td>
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
  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
