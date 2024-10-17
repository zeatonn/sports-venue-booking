import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Navbar() {
  return (
    <div className={styles.nav_cont}>
      <Link to="/">Home</Link>
      <Link to="/sports">All Sports</Link>
    </div>
  );
}
