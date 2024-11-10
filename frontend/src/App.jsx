import { FloatingShape } from "./components/floatingShape"
import { Route, Routes } from "react-router-dom"
import { SignupPage } from "./pages/signupPage"
import { LoginPage } from "./pages/loginPage"
import { EmailVerificationPage } from "./pages/emailVerificationPage"

function App() {

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
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
