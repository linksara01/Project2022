import Link from "next/link";
import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder, setCash, title }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");


  const handleClick = () => {
    createOrder({ customer, address, total, tel, title, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setCash(false)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>เก็บเงินปลายทาง</h1>
        <div className={styles.item}>
          <label className={styles.label}>
            การเก็บเงินปลายทางสำหรับลูกค้าภายในจังหวัดสงขลาเท่านั้น
            หากคุณลูกค้าไม่ได้อยู่ภายในจังหวัดสงขลา โปรดชำระเงินด้วย{" "}
            <b>Paypal</b>
          </label>
          <label className={styles.label}> ชื่อ นามสกุล </label>
          <input
            placeholder="โปรดกรอกชื่อและนามสกุล"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
          <label className={styles.label}> เบอร์โทรศัพท์ </label>
          <input
            placeholder="+66 897654321"
            type="Number"
            className={styles.input}
            onChange={(e) => setTel(e.target.value)}
          />
          <label className={styles.label}> ที่อยู่ </label>
          <textarea
            placeholder="โปรดกรอกที่อยู่"
            type="text"
            className={styles.area}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className={styles.label}>
            โปรดเตรียมสำหรับค่าจัดส่งเพิ่มเติม 20 บาท
          </label>
        </div>
        <button className={styles.button} onClick={handleClick}>
          ยืนยันการสั่งซื้อ
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const productRes = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      orders: productRes.data,
    },
  };
};

export default OrderDetail;
