import { UserLogin } from "../interfaces/UserLogin";

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export { login };
