import styles from "../../styles/Resale.module.css";
import Image from "next/image";
import axios from "axios";

const Resale = ({ resale }) => {
  const status = resale.status;
  const size = ["เล็ก","กลาง", "ใหญ่"];


  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
          </tr>
          <tr className={styles.tr}>
            <td>
              <Image
                src={resale.img}
                width={400}
                height={300}
                objectfit="cover"
                alt=""
              />
            </td>
          </tr>
          </table>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tr className={styles.trTitle}>
              <th>ID Resale</th>
              <th>ID Order</th>
              <th>ชื่อลูกค้า</th>
              <th>ที่อยู่</th>
              <th>ราคา</th>
              <th>จำนวน</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{resale._id}</span>
              </td>
              <td>
                <span className={styles.id}>{resale.orderId}</span>
              </td>
              <td>
                <span className={styles.name}>{resale.customer}</span>
              </td>
              <td>
                <span className={styles.address}>{resale.address}</span>
              </td>
              <td>
                <span className={styles.total}>{resale.prices}</span>
              </td>
              <td>
                <span className={styles.total}>{resale.amount}</span>
              </td>
              <td>{size[resale.prices]}</td>
            </tr>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image
              className={styles.checkIcon}
              src="/img/paid.png"
              width={30}
              height={30}
              alt=""
            />
            <span>ได้รับรายการขายคืน</span>
            <div className={styles.checkIcon}>
              <Image
                className={styles.checkIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/checklist.png" width={35} height={35} alt="" />
            <span>กำลังตรวจสอบรายการ</span>
            <div className={styles.checkIcon}>
              <Image src="/img/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>กำลังไปรับของ</span>
            <div className={styles.checkIcon}>
              <Image src="/img/checked.png" width={20} height={20} alt="" />
            </div>
          </div>          
          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>ขายคืนสำเร็จ</span>
            <div className={styles.checkIcon}>
              <Image src="/img/checked.png" width={20} height={20} alt="" />
            </div>
          </div>     
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/resales/${params.id}`);
  return {
    props: {
      resale: res.data,
    },
  };
};

export default Resale;
