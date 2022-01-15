import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/ปลา8.jpg" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>สามารถสั่งซื้อปลาได้
          <br />ผ่านเว็ปและหน้าร้าน</h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>สถานที่ตั้งร้าน</h1>
          <p className={styles.text}>
            70 ถ.ศรีสำเภา ต.ท่ากง
            <br />  จ.นครใหม่ 90115
            <br /> 012-3456789
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>เวลาเปิดร้าน</h1>
          <p className={styles.text}>
            เปิดทุกวัน
            <br /> 06.00 น. - 16.00 น.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
