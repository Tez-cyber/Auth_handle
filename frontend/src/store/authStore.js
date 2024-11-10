import { create } from 'zustand'
import axios from "axios"

const API_URL = "http://localhost:9090/api/auth";
axios.defaults.withCredentials = true; // For every req, axios puts the cookies in the req.header

export const useAuthStore = create(set => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async(email, password, name) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password,name })
            set({ 
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            }) //This is because when you signup, user response is sent (check authController)
        }catch (err) {
            set({ error: err.response.data.message || "Error signing up", isLoading: false})
            throw err;
        }
    }
}))

