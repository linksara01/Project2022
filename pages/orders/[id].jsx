import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {
  const status = order.status;

  const allPay = (order) => {
    if (order.method === 0) return order.total + 20;
    if (order.method === 1) return order.total;
  };

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
              <th>หมายเลขการสั่งซื้อ</th>
              <th>ชื่อลูกค้า</th>
              <th>ที่อยู่</th>
              <th>เบอร์โทรศัพท์</th>
              <th>วิธีการชำระเงิน</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{order._id}</span>
              </td>
              <td>
                <span className={styles.name}>{order.customer}</span>
              </td>
              <td>
                <span className={styles.address}>{order.address}</span>
              </td>
              <td>
                <span className={styles.tel}>{order.tel}</span>
              </td>
              <td>
                {order.method === 0 ? (
                  <span>จ่ายปลายทาง</span>
                ) : (
                  <span>Paypal</span>
                )}
              </td>
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
            <span>จ่ายเงินแล้ว</span>
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
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>กำลังจัดส่ง</span>
            <div className={styles.checkIcon}>
              <Image src="/img/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>จัดส่งเรียบร้อยแล้ว</span>
            <div className={styles.checkIcon}>
              <Image src="/img/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>ราคาทั้งหมด</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>ราคาสั่งซื้อ</b> {order.total} บาท
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>ค่าจัดส่ง</b> {order.method === 0 ? (
                  <span>20 บาท</span>
                ) : (
                  <span>0 บาท</span>
                )}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>รวมทั้งหมด</b>            
                {order.method === 0 ? (
                  <span>{order.total+20}</span>
                ) : (
                  <span>{order.total}</span>
                )}
       
          </div>
          <button disable className={styles.button}>
            จ่ายเงินปลายทาง
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: {
      order: res.data,
    },
  };
};

export default Order;
