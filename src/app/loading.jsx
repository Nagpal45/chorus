import styles from "./loading.module.css"

export default function Loading() {
  return<div>
   <div className={styles.dotspinner}>
  <div className={styles.dotspinner__dot}></div>
  <div className={styles.dotspinner__dot}></div>
  <div className={styles.dotspinner__dot}></div>
  <div className={styles.dotspinner__dot}></div>
  <div className={styles.dotspinner__dot}></div>
  <div className={styles.dotspinner__dot}></div>
  <div className={styles.dotspinner__dot}></div>
  <div className={styles.dotspinner__dot}></div>
  </div>
</div>;
}
