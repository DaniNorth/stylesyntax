const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/quiz'
    : `${import.meta.env.VITE_BACK_END_SERVER_URL}/quiz`;

const getQuestions = async (gender) => {
  try {
    const res = await fetch(`${BASE_URL}/questions?gender=${gender}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch quiz questions.");
  }
};

const submitAnswers = async (answers) => {
  try {
    const res = await fetch(`${BASE_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ answers }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Submission failed");
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export {
  getQuestions,
  submitAnswers,
};