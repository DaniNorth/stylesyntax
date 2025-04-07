import { useState, useEffect } from 'react';
import * as folderService from '../../services/folderService';
import './AddOutfitModal.css';

const AddOutfitModal = ({ outfitId, onClose }) => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await folderService.index();
        setFolders(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load folders.');
      }
    };
    fetchFolders();
  }, []);

  const handleAddToFolder = async (folderId) => {
    try {
      await folderService.addOutfitToFolder(folderId, outfitId);
      onClose();
    } catch (err) {
      setError(err.message || 'Error adding to folder');
    }
  };

  const handleCreateAndAdd = async () => {
    try {
      if (!newFolderName.trim()) return;
      const newFolder = await folderService.create({ title: newFolderName });
      await folderService.addOutfitToFolder(newFolder._id, outfitId);
      onClose();
    } catch (err) {
      setError(err.message || 'Error creating folder');
    }
  };

  return (
    <div className="folder-modal-backdrop">
      <div className="folder-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Save to Folder</h2>

        {error && <p className="error">{error}</p>}

        <ul className="folder-list">
          {folders.map(folder => (
            <li key={folder._id}>
              <button 
                className="folder-option"
                onClick={() => handleAddToFolder(folder._id)}
              >
                {folder.title}
              </button>
            </li>
          ))}
        </ul>

        <input
          type="text"
          placeholder="New folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button 
          className="create-folder-button"
          onClick={handleCreateAndAdd}
        >
          Create & Save
        </button>
      </div>
    </div>
  );
};

export default AddOutfitModal;