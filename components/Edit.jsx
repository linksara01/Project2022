import { useEffect, useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const Edit = ({ setClose2, fishList }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOption, setExtraOption] = useState([]);
  const [extra, setExtra] = useState(null);



  console.log(fishList);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOption((prev) => [...prev, extra]);
  };

  const handleEdit = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/djbqug0db/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOption,
        img: url,
      };

      await axios.patch("http://localhost:3000/api/products", newProduct);
      setClose2(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose2(true)} className={styles.close}>
          X
        </span>
        <h1>เพิ่มปลา</h1>
        <div className={styles.item}>
          <label className={styles.label}>เลือกรูปภาพ</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
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
          <label className={styles.label}>ข้อมูลปลาเพิ่มเติม</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
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
          <label className={styles.extra}>เพิ่มเติม</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSmall}`}
              type="text"
              placeholder="กรอกข้อมูล"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSmall}`}
              type="number"
              placeholder="ราคา"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              เพิ่ม
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOption.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleEdit}>
          สร้าง
        </button>
      </div>
    </div>
  );
};

export default Edit;
