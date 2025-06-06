const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/users'
    : `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getUserById = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const followUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}/follow`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  return data;
};

const unfollowUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}/unfollow`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  return data;
};

const uploadProfilePic = async (userId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`${BASE_URL}/${userId}/upload-profile-pic`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    };

    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  };
};

const updateUser = async (userId, userFormData) => {
  try {
    const res = await fetch (`${BASE_URL}/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userFormData)
    });
    return res.json();
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const res = await fetch (`${BASE_URL}/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(err.message);
  }
};

export {
  index,
  getUserById,
  followUser,
  unfollowUser,
  uploadProfilePic,
  updateUser,
  deleteUser,
};
