import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";


export const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

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
                <form className="space-y-6">
                    <div className="flex justify-between">
                        {
                            code.map((digit, i) => {
                                <input
                                    key={i}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    maxLength='6'
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    type="text"
                                    className="size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2
                                        border-gray-600 rounded-lg focus:bg-green-500 focus:outline-none
                                    "
                                 />
                            })
                        }
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
