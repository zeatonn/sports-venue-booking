import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import axios from "axios";

export default function NewCenter({ fetchCenters }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

  const createCenter = useCallback(() => {
    axios.post("/center/new", { name, id: name, location: name }).then(() => {
      setIsModalOpen(false);
      fetchCenters();
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
        New Center
      </Button>
      <Modal
        title="New Center"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Center Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </>
  );
}
