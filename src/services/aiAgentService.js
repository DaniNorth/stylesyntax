const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/aiAgent'
    : `${import.meta.env.VITE_BACK_END_SERVER_URL}/aiAgent`;

const requestRecommendation = async ({ userProfile, prompt, chatLog = [] }) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        userProfile,
        prompt,
        chatLog: Array.isArray(chatLog) ? chatLog : [],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('AI Agent response error:', data.err || data);
      throw new Error(data.err || `AI request failed with status ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error calling aiAgent:', error.message || error);
    throw error;
  }
};

export { requestRecommendation };
