import axios from "axios";
import { useState } from "react";
import styles from "../../styles/Login.module.css";


const Login = () => {
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
        <h1>ล็อคอินเข้าสู่ระบบ</h1>
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
        <button onClick={handleClick} className={styles.button}>
          เข้าสู่ระบบ
        </button>
        {error && (
          <span className={styles.error}>รหัสผิดพลาด โปรดกรอกใหม่อีกครั้ง</span>
        )}
      </div>
    </div>
  );
};

export default Login
