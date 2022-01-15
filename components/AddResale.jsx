import { useState } from "react";
import styles from "../styles/AddResale.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const Add = ({ setClose1 }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState(null);
  const [amount, setAmount] = useState(null);
  const [tel, setTel] = useState(null);
  const [prices, setPrices] = useState([]);
  const [status, setStatus] = useState(0);
 
  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/djbqug0db/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newResale = {
        title,
        customer,
        orderId,
        address,
        tel,
        prices,
        amount,
        status,
        img: url,
      };

      await axios.post("http://localhost:3000/api/resales", newResale);
      setClose1(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose1(true)} className={styles.close}>
          X
        </span>
        <h1>ขายคืน</h1>
        <div className={styles.item}>
          <label className={styles.label}>เลือกรูปภาพ</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Order ID</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setOrderId(e.target.value)}
          />
        <div className={styles.item}>
          <label className={styles.label}>ชื่อลูกค้า</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>ที่อยู่</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        
        <div className={styles.item}>
          <label className={styles.label}>เบอร์โทรศัพท์</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>ชื่อปลา</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>ราคา</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSmall}`}
              type="number"
              placeholder="เล็ก"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputMedium}`}
              type="number"
              placeholder="กลาง"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputLarge}`}
              type="number"
              placeholder="ใหญ่"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>จำนวน</label>
          <input
            className={`${styles.input} ${styles.inputSmall}`}
            type="number"
            placeholder="กรอกจำนวน"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className={styles.addButton} onClick={handleCreate}>
        สร้าง
      </button>
        </div>
        </div>
      </div>
      
    </div>
  );
};

export default Add;
