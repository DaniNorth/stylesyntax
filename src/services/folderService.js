const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/folders'
    : `${import.meta.env.VITE_BACK_END_SERVER_URL}/folders`;

  const headers = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

const index = async () => {
  const res = await fetch(BASE_URL, {
    headers: headers(),
  });
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  return data;
};

const show = async (folderId) => {
  const res = await fetch(`${BASE_URL}/${folderId}`, {
    headers: headers(),
  });
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  return data;
};

const create = async (folderData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(folderData),
  });
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  return data;
};

const updateTitle = async (folderId, updatedData) => {
    const res = await fetch(`${BASE_URL}/${folderId}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify(updatedData),
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  };

const addOutfitToFolder = async (folderId, outfitId) => {
  const res = await fetch(`${BASE_URL}/${folderId}/add-outfit`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({ outfitId }),
  });
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  return data;
};

const destroy = async (folderId) => {
  const res = await fetch(`${BASE_URL}/${folderId}`, {
    method: 'DELETE',
    headers: headers(),
  });
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  return data;
};

export {
  index,
  show,
  create,
  updateTitle,
  addOutfitToFolder,
  destroy,
};