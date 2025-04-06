import { useState } from 'react';
import * as folderService from '../../services/folderService';
import './FolderModal.css';

const FolderModal = ({ onClose }) => {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async () => {
    try {
      if (!folderName.trim()) return;
      await folderService.create({ title: folderName });
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="folder-modal-backdrop">
      <div className="folder-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Create New Folder</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />

        <button className="create-folder-button" onClick={handleCreate}>
          Create Folder
        </button>
      </div>
    </div>
  );
};

export default FolderModal;
