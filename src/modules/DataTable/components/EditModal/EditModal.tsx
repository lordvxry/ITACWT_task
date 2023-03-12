import { FC, useEffect, useMemo, useState } from 'react';
import './EditModal.css';
import { Button, Input, message, Modal } from 'antd';
import { EditableContentModel } from '../../models/EditableContentModel';

interface Props {
  modalVisible: boolean;
  setModalVisible: (bol: boolean) => void;
  selectedRow: EditableContentModel | null;
  updateDataItemValue: (item: EditableContentModel) => void;
}

const EditModal: FC<Props> = ({
  modalVisible,
  setModalVisible,
  selectedRow,
  updateDataItemValue,
}) => {
  const [editedValue, setEditedValue] = useState('');

  useEffect(() => {
    if (selectedRow) setEditedValue(selectedRow.value);
  }, [selectedRow]);

  const isDisabledSaveBtn = useMemo(() => {
    if (selectedRow) return selectedRow.value === editedValue || !editedValue;
  }, [editedValue, selectedRow]);

  const handleSave = () => {
    if (!selectedRow || isDisabledSaveBtn) return;

    const updatedDataItem = { ...selectedRow, value: editedValue };
    updateDataItemValue(updatedDataItem);
    message.success(`${selectedRow?.title} successfully updated`);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Modal title="Edit" open={modalVisible} footer={null} onCancel={handleCancel}>
      <div className="edit-modal_container">
        <div>
          <h4>{selectedRow?.title}</h4>
          <Input
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSave();
              }
            }}
          />
        </div>
        <div className="edit-modal_btns">
          <Button type="primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSave} disabled={isDisabledSaveBtn}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
