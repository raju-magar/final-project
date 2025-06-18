// Login.jsx
export default function Login() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Page</h2>
            <form>
                <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded mb-4" />
                <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded mb-4" />
                <button type="submit" placeholder="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
            </form>
            </div>
        </div>
    );
}