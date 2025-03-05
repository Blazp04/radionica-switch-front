import apiConfig from "../config/axiosConfig";

async function signIn(email: string, password: string): Promise<string> {
  try {
    const payload = {
      username: email,
      password: password,
    };
    const response = await apiConfig.post("auth/login", payload);
    const data = response.data;
    const token = data.access_token;
    localStorage.setItem("access_token", token);
    return token;
  } catch (e) {
    throw e;
  }
}

export { signIn };
