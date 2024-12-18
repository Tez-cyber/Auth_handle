import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast"

export const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const { error, isLoading, verifyEmail } = useAuthStore()

    const handleChange = (i, value) => {
        const newCode = [...code];

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let j = 0; j < 6; j++) {
                newCode[j] = pastedCode[j] || ""
            }
            setCode(newCode)

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
            inputRefs.current[focusIndex].focus();
        }else {
            newCode[i] = value;
            setCode(newCode)

            // Move focus to the next input field if value is entered
            if (value && i < 5) {
                inputRefs.current[i + 1].focus()
            }
        }
    }
    const handleKeyDown = (i, e) => {
        if (e.key === "Backspace" && !code[i] && i > 0) {
            inputRefs.current[i - 1].focus()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
            toast.success("Email verified successfully")
        }catch (err) {
            console.log(err)
        }
    }

    // Auto submit when all fields are filled
    useEffect(() => {
        if (code.every(digit => digit !== "")) {
            handleSubmit(new Event('submit'))
        }
    }, [code]) 

    return (
        <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl
        rounded-2xl shadow-2xl overflow-hidden
    ">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .5 }}
                className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl
                    shadow-2xl p-8 w-full max-w-md
                "
            >
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r
                from-green-400 to-emerald-400 text-transparent bg-clip-text"
                >
                    Verify your Email
                </h2>
                <p className="text-center text-gray-400 mb-6">
                    Enter the 6-digit code sent to your email address
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        {
                            code.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    maxLength='6'
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    type="text"
                                    className="size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2
                                        border-gray-600 rounded-lg focus:border-green-500 focus:outline-none
                                    "
                                />
                            ))
                        }
                    </div>
                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}   
                    <motion.button
                        className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white
                    font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none
                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200
                "
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading || code.some(digit => !digit)}
                    >
                        {
                            isLoading ? "Verifying...." : "Verify Email"
                        }
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}
