import axios from "axios";
import { useState } from "react";
import styles from "../../styles/Register.module.css";

const register = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);

    const handleClick = async () => {
        try {
          await axios.post("http://localhost:3000", {
            username,
            password,
          });
        } catch (err) {
          setError(true);
        }
      };


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>สมัครสมาชิก</h1>
        <input
          placeholder="กรอกรหัสผู้ใช้งาน"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="กรอกรหัสผ่าน"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="ชื่อ"
          className={styles.input}
        />
            <input
          placeholder="นามสกุล"
          className={styles.input}
        />
        <input
          placeholder="ที่อยู่"
          className={styles.input}
        />
          <input
          placeholder="เบอร์โทรศัพท์"
          className={styles.input}
        />
        <input
          placeholder="LineID"
          className={styles.input}
        />
        <button onClick={handleClick} className={styles.button}>
          สมัครสมาชิก
        </button>
        {error && (
          <span className={styles.error}>ไม่สามารถยืนยันการสมัคร โปรดกรอกใหม่อีกครั้ง</span>
        )}
      </div>
    </div>
  );
};

export default register;
