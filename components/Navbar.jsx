import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/Link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ติดต่อสอบถาม</div>
          <div className={styles.text}>โทร 012 345678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>หน้าแรก</li>
          </Link>
          <Link href="/buy" passHref>
          <li className={styles.listItem}>เลือกซื้อปลา</li>
          </Link>
          <Image src="/img/fish.png" alt="" width="100px" height="69px" />
          <Link href="/resale" passHref>
          <li className={styles.listItem}>ขายคืน</li>
          </Link>
          <Link href="/delivery" passHref>
          <li className={styles.listItem}>การจัดส่ง</li>
          </Link>
        </ul>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
        <Link href="/user/register" passHref>
          <li className={styles.listItem}>สมัครสมาชิก</li>
          </Link>
          <Link href="/user/login" passHref>
          <li className={styles.listItem}>ล็อคอิน</li>
          </Link>
        </ul>
        <div className={styles.cart}>
          <Link href="/cart" passHref>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
          </Link>
          <div className={styles.counter}>{quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
