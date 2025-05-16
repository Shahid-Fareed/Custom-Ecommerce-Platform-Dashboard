// components/EditRowModal.tsx
import React from 'react';

interface EditRowModalProps {
  row: TableRow | null;
  onClose: () => void;
}

const EditRowModal: React.FC<EditRowModalProps> = ({ row, onClose }) => {
  return (
    <div className="modal">
      <h2>Edit Row</h2>
      {row && (
        <div>
          {/* Render form elements to edit the row */}
          <p>ID: {row.id}</p>
          <p>Order: {row.order}</p>
          {/* Add other fields as needed */}
        </div>
      )}
      <button onClick={onClose}>Close</button>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};

export default EditRowModal;