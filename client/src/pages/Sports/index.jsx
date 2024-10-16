import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import NewSport from "./NewSport";

export default function SportsPage() {
  const [sports, setSports] = useState();

  const fetchAllSports = useCallback(() => {
    axios.get("/sport/all").then((res) => {
      setSports(res.data.data);
    });
  }, []);

  useEffect(() => {
    fetchAllSports();
  }, []);

  return (
    <main className={styles.page_cont}>
      <h2>All Sports</h2>
      <div className={styles.sports_cont}>
        {sports
          ? sports.map((sport, index) => <div key={index}>{sport.name}</div>)
          : null}
      </div>
      <NewSport fetchSports={fetchAllSports} />
    </main>
  );
}
