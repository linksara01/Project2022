import { useState } from "react";
import AddResale from "../components/AddResale"
import AddButtonResale from "../components/AddButtonResale";
import styles from "../styles/PageResale.module.css";

const resale = () => {
    
    const [close1,setClose1] = useState(true);
    return (
        <div className={styles.container}>
            <div className={styles.title}>
            การขายคืน
            </div>
        <div className={styles.wrapper}>
            <div className={styles.desc}>
             เพื่อให้ลูกค้าสามารถนำปลาที่ซื้อกลับมาเพื่อขายคืน โปรดคลิกเพื่อเพิ่มข้อมูลการขายคืน
            </div>
            </div>
         <AddButtonResale setClose1={setClose1} />
         {!close1 && <AddResale setClose1={setClose1} />}
         
        </div>
    )
}

export default resale
