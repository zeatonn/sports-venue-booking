import styles from "./styles.module.scss";
import axios from "axios";
import { Button, Modal, Input } from "antd";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

export default function Calendar({ courts, date, fetchCourts }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [court, setCourt] = useState(null);
  const [hour, setHour] = useState(0);
  const [comments, setComments] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function isBookingInHour(bookings, targetHour) {
    return bookings.find((booking) => {
      const bookingHour = new Date(booking.startTime).getHours(); // Extract the hour from the startTime
      if (bookingHour === targetHour) {
        return true;
      }
      return false;
    });
  }

  const createBooking = useCallback(() => {
    axios
      .post("/court/add-booking", {
        startTime: dayjs(date)
          .set("hour", hour - 2)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
          .toISOString(),
        courtId: court.id,
        comments,
      })
      .then(() => {
        fetchCourts();
        setIsModalOpen(false);
      });
  }, [courts, hour, comments]);

  const showModal = (hour, court) => {
    setCourt(court);
    setHour(hour);
    setComments("");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    createBooking();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cont}>
      <div
        className={styles.row}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className={styles.header_card}>Date</div>
        {courts.map((court, index) => (
          <div className={styles.header_card} key={index}>
            {court.name}
          </div>
        ))}
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          {hours.map((hour, index) => (
            <div className={styles.header_card} key={index}>
              {hour}:00 - {hour + 1}:00
            </div>
          ))}
        </div>
        {courts.map((court, index) => (
          <div className={styles.col} key={index}>
            {hours.map((hour, index) => {
              const booking = isBookingInHour(court.bookings, hour);
              return (
                <Button
                  className={styles.booking}
                  key={index}
                  variant="solid"
                  color="primary"
                  style={{
                    background: !booking ? "#03dac5" : "#D21312",
                  }}
                  onClick={() => {
                    if (!booking) {
                      showModal(hour, court);
                    }
                  }}
                >
                  {!booking ? "-" : booking.comments}
                </Button>
              );
            })}
          </div>
        ))}
      </div>
      <Modal
        title={`New Booking for hours ${hour}:00 - ${hour + 1}:00 in ${
          court?.name
        }`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Booking Name"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </Modal>
    </div>
  );
}
