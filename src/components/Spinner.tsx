import styles from "../styles/Home.module.scss";
const Spinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
        </div>
    )
}
export default Spinner;