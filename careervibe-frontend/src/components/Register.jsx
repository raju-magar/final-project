export default function Register() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-200 via-purple-200 to pink-200">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
            <form>
                <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded mb-4" />
                <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded mb-4" />
                <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded mb-4" />
                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">Register</button>"
            </form>
            </div>
        </div>
    );
}