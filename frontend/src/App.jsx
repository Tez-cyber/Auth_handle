import { FloatingShape } from "./components/floatingShape"
import { Navigate, Route, Routes } from "react-router-dom"
import { SignupPage } from "./pages/signupPage"
import { LoginPage } from "./pages/loginPage"
import { EmailVerificationPage } from "./pages/emailVerificationPage"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"

// redirect users to homepage
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to={"/"} replace /> // navigate to home and replace with current page 
  }

  return children // return current page
}

function App() {
  const { checkAuth, isCheckingAuth, isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({
    "isAuthenticated": isAuthenticated,
    "user": user
  }

  )
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
          <Route path="/" element={"Home page"} />
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
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
