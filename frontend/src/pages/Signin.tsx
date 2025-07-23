import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const signin = async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username, password
        })
        localStorage.setItem('token', response.data.token)
        navigate('/dashboard')
        
    }

    return <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
        <div className="bg-white rounded-xl shadow-lg border-none border-gray-200  min-w-80 max-w-xs space-y-3 p-8 hover:shadow-xl transition-shadow duration-300">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Mindrelic</h1>
            <p className="text-center text-gray-500 text-sm mb-4">Sign in to your account</p>

            <Input
                label="Username"
                placeholder="Enter your username"
                reference={usernameRef}
                type="text"
                name="username"
                autoComplete="username"
                required
            />
            <Input
                label="Password"
                placeholder="Enter your password"
                reference={passwordRef}
                type="password"
                name="password"
                autoComplete="password"
                required
            />

            <div className="flex justify-center pt-4">
                <Button onClick={signin} variant="primary" text="Signin" fullWidth={true} loading={false}/>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-600 hover:underline font-medium">
                    Sign up
                </a>
            </p>
        </div>
    </div>
}