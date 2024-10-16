import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import axios from "axios";

export default function NewCourt({ sportId, fetchCourts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

  const createCenter = useCallback(() => {
    axios.post("/court/new", { name, sportCenterId: sportId }).then(() => {
      setIsModalOpen(false);
      fetchCourts();
    });
  }, [name]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    createCenter();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setName("");
  }, [open]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        New Court
      </Button>
      <Modal
        title="New Court"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Court Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </>
  );
}
