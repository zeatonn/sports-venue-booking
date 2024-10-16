import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Select, DatePicker } from "antd";
import styles from "./styles.module.scss";
import NewCenter from "./NewCenter";
import AddSport from "./AddSport";
import dayjs from "dayjs";
import NewCourt from "./NewCourt";
import Calendar from "./Calendar";

export default function HomePage() {
  const [allCenters, setAllCenters] = useState(null);
  const [center, setCenter] = useState(null);
  const [sport, setSport] = useState(null);
  const [date, setDate] = useState(dayjs());

  const [courts, setCourts] = useState(null);

  const fetchAllCenters = useCallback(() => {
    setAllCenters(null);
    axios.get("/center/all").then((res) => {
      setAllCenters(res.data.data);
      if (!center && res.data.data.length) {
        setCenter(res.data.data[0]);
        if (!sport && res.data.data[0].sports.length) {
          setSport(res.data.data[0].sports[0]);
        }
      }
    });
  }, [center, sport]);

  const fetchCourts = useCallback(() => {
    setCourts(null);
    if (sport) {
      axios
        .get(`/court/all/${sport.id}/${date.toDate().toString()}`)
        .then((res) => {
          setCourts(res.data.data);
        });
    }
  }, [sport, date]);

  useEffect(() => {
    fetchCourts();
  }, [sport, date]);

  useEffect(() => {
    fetchAllCenters();
  }, []);

  return (
    <main className={styles.page_cont}>
      <div className={styles.filter_row}>
        {allCenters !== null && (
          <>
            <Select
              value={center ? center.name : ""}
              style={{ width: 120 }}
              onChange={(e) => {
                const newCenter = allCenters.find((center) => center.id === e);
                setCenter(newCenter);
              }}
              options={allCenters.map((center) => ({
                value: center.id,
                label: center.name,
              }))}
            />
            <NewCenter fetchCenters={fetchAllCenters} />

            {center && (
              <>
                <Select
                  value={sport ? sport.id : ""}
                  style={{ width: 120 }}
                  onChange={(e) => {
                    const newSport = center.sports.find((s) => s.id === e);
                    setSport(newSport);
                  }}
                  options={center.sports.map((sport) => ({
                    value: sport.id,
                    label: sport.sport.name,
                  }))}
                />
                <AddSport centerId={center.id} fetchCenters={fetchAllCenters} />

                {sport && (
                  <>
                    <DatePicker value={date} onChange={(e) => setDate(e)} />
                  </>
                )}

                <NewCourt sportId={sport.id} fetchCourts={fetchCourts} />
              </>
            )}
          </>
        )}
      </div>
      {courts && (
        <Calendar date={date} courts={courts} fetchCourts={fetchCourts} />
      )}
    </main>
  );
}
