import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import axios from "axios";

export default function NewSport({ fetchSports }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

  const createSport = useCallback(() => {
    axios.post("/sport/new", { name, id: name }).then(() => {
      setIsModalOpen(false);
      fetchSports();
    });
  }, [name]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    createSport();
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
        Create Sport
      </Button>
      <Modal
        title="New Sport"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Sport Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </>
  );
}
