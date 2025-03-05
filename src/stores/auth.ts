import { defineStore } from "pinia";
import { ref } from "vue";
import { signIn } from "../repository/loginRepository";

export const useAuthStore = defineStore("auth", () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isAuthenticated = ref(false);
  const user = ref<{ email: string } | null>(null);

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      await signIn(email, password);
      isAuthenticated.value = true;
      user.value = { email };
    } catch (e) {
      error.value = (e as Error).message;
      isAuthenticated.value = false;
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    isAuthenticated.value = false;
    user.value = null;
  };

  return {
    isLoading,
    error,
    isAuthenticated,
    user,
    login,
    logout,
  };
});
