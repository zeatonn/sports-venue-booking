import styles from './styles.module.scss';

export default function Navbar() {
    return <div className={styles.nav_cont}>
        <a href="/">Home</a>
        <a href="/sports">All Sports</a>
    </div>;
}