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
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code })

            set({
                user: response.data.user,
                isAuthenticated: true,
                error: null,
                isLoading: false
            })

            return response.data;
        }catch (err) {
            set({ error: err.response.data.message || "Error verifying email", isLoading: false })
            throw err;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null })

        try {
            const response = await axios.post(`${API_URL}/login`, { email, password })
            set({ 
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
            })
        }catch(err) {
            set({ error: err.response?.data?.message || "Error logging in", isLoading: false })
            throw err;
        }
    },

    checkAuth: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000)) // loading effect
        set({ isCheckingAuth: true, error: null });

        try {
            const response = await axios.get(`${API_URL}/check-auth`)

            set({
                user: response.data.user,
                isAuthenticated: true,
                isCheckingAuth: false
            })
        }catch(err) {
            set({ error: null, isCheckingAuth: false , isAuthenticated: false})
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try{
            await axios.post(`${API_URL}/logout`);
            set({
                user: null, 
                isAuthenticated: false, 
                error: null, 
                isLoading: false
            })
        }catch (err) {
            set({ error: "Error logging out", isLoading: false })
            throw error
        }
    }
}))

