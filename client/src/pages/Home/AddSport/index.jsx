import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Select } from "antd";
import axios from "axios";

export default function AddSport({ centerId, fetchCenters }) {
  const [sports, setSports] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sportId, setSport] = useState("");

  const fetchAllSports = useCallback(() => {
    axios.get("/sport/all").then((res) => {
      setSports(res.data.data);
    });
  }, []);

  useEffect(() => {
    fetchAllSports();
  }, []);

  const addSport = useCallback(() => {
    axios.post("/center/add-sport", { centerId, sportId }).then(() => {
      setIsModalOpen(false);
      fetchCenters();
    });
  }, [centerId, sportId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    addSport();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setSport("");
  }, [open]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Sport
      </Button>
      <Modal
        title="Add Sport"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {sports && (
          <Select
            style={{ width: 240 }}
            placeholder="Select Sport"
            value={sportId}
            onChange={(e) => {
              setSport(e);
            }}
            options={sports.map((sport) => ({
              value: sport.id,
              label: sport.name,
            }))}
          />
        )}
      </Modal>
    </>
  );
}
