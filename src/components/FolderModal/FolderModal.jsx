import { useEffect, useState } from 'react';
import * as folderService from '../../services/folderService';
import './FolderModal.css';

const FolderModal = ({ onClose }) => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [editStates, setEditStates] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await folderService.index();
        setFolders(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load folders');
      }
    };

    fetchFolders();
  }, []);

  const handleCreateFolder = async () => {
    try {
      if (!newFolderName.trim()) return;
      const newFolder = await folderService.create({ title: newFolderName });
      setFolders([...folders, newFolder]);
      setNewFolderName('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateFolderTitle = async (id) => {
    try {
      const newTitle = editStates[id];
      if (!newTitle.trim()) {
        setError('Folder title cannot be empty');
        return;
      }
      const updated = await folderService.updateTitle(id, { title: newTitle });
      setFolders(folders.map((f) => (f._id === id ? updated : f)));
      setEditStates({ ...editStates, [id]: undefined });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteFolder = async (id) => {
    try {
      await folderService.destroy(id);
      setFolders(folders.filter((f) => f._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="folder-modal-backdrop">
      <div className="folder-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Manage Folders</h2>

        {error && <p className="error">{error}</p>}

        <ul className="folder-list">
          {folders.map((folder) => (
            <li key={folder._id}>
              <div className="folder-item-row">
                {editStates[folder._id] !== undefined ? (
                  <>
                    <input
                      value={editStates[folder._id]}
                      onChange={(e) =>
                        setEditStates({ ...editStates, [folder._id]: e.target.value })
                      }
                    />
                    <button onClick={() => handleUpdateFolderTitle(folder._id)}>
                      Save
                    </button>
                  </>
                ) : (
                  <span>{folder.title}</span>
                )}
                <div>
                  <button
                    onClick={() =>
                      setEditStates({ ...editStates, [folder._id]: folder.title })
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteFolder(folder._id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="create-folder-section">
          <input
            placeholder="New folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button className="create-folder-button" onClick={handleCreateFolder}>
            + Create Folder
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderModal;