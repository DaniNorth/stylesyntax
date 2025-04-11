const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/outfits'
    : `${import.meta.env.VITE_BACK_END_SERVER_URL}/outfits`;



const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

// GET a single outfit
const show = async (updatedID) => {
  try {
    const res = await fetch(`${BASE_URL}/${updatedID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

// CREATE a new outfit
const create = async (outfitFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: outfitFormData,
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const updateOutfit = async (updatedID, outfitFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${updatedID}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: outfitFormData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Update failed:', error);
  }
};

const deleteOutfit = async (updatedID) => {
  try {
    const res = await fetch(`${BASE_URL}/${updatedID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const createComment = async (updatedID, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${updatedID}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const updateComment = async (outfitId, commentId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${outfitId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      });
      return res.json();
    } catch (error) {
      console.error(error);
    }
  };

const deleteComment = async (outfitId, commentId) => {
    try {
      const res = await fetch(`${BASE_URL}/${outfitId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.error(error);
    }
  };

export {
  index,
  show,
  create,
  createComment,
  deleteOutfit,
  updateOutfit,
  updateComment,
  deleteComment,
}; 