import { FloatingShape } from "./components/floatingShape"
import { LoadingSpinner } from "./components/loadingSpinner"


import { SignupPage } from "./pages/signupPage"
import { LoginPage } from "./pages/loginPage"
import { EmailVerificationPage } from "./pages/emailVerificationPage"
import { DashboardPage } from "./pages/dashboardPage"

import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { ForgotPasswordPage } from "./pages/forgotPasswordPage"
import { ResetPasswordPage } from "./pages/resetPasswordPage"


//protect routes that require auth
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  if(!isAuthenticated) {
    return <Navigate to={"/login"} replace />
  }

  if(!user.isVerified) {
    return <Navigate to={"/verify-email"} replace />
  }

  return children
}

// redirect users to homepage
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to={"/"} replace /> // navigate to home and replace with current page 
  }

  return children // return current page
}

function App() {
  const { checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth) return <LoadingSpinner />;
  console.log(`isAuthenticated: ${isAuthenticated}`)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br p-5
        from-gray-900 via-green-900 to-emerald-900 flex items-center 
        justify-center relative overflow-hidden
      ">
        <FloatingShape
          color="bg-green-500" size="w-64 h-64"
          top="-5%" left="10%" delay={0}
        />
        <FloatingShape
          color="bg-emerald-500" size="w-48 h-48"
          top="70%" left="80%" delay={5}
        />
        <FloatingShape
          color="bg-lime-500" size="w-32 h-32"
          top="40%" left="-10%" delay={2}
        />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/login" element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/forgot-password" element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="reset-password/:token" element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
          />
          {/* Catch all routes */}
          <Route path="*" element={
            <Navigate to='/' replace />
          }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
