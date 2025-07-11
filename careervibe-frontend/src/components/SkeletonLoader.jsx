import { motion } from "framer-motion";

export default function SkeletonLoader() {
    return (
        <div className="max-w-5xl mx-auto min-h-screen flex items-center justify-center">
            <div className="bg-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-lg w-full max-w-lg animate-pulse">
                <div className="h-8 bg-white/20 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-white/20 rounded w-1/2 mb-8"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/15 p-6 rounded-2xl h-32">
                        <div className="h-5 bg-white/20 rounded w-3/4 mb-3"></div>
                        <div className="h-10 bg-white/20 rounded w-1/2"></div>
                    </div>
                    <div className="bg-white/15 p-6 rounded-2xl h-32">
                        <div className="h-5 bg-white/20 rounded w-3/4 mb-3"></div>
                        <div className="h-10 bg-white/20 rounded w-1/2"></div>
                    </div>
                    <div className="bg-white/15 p-6 rounded-2xl h-32">
                        <div className="h-5 bg-white/20 rounded w-3/4 mb-3"></div>
                        <div className="h-10 bg-white/20 rounded w-1/2"></div>
                    </div>
                </div>

                <div className="mt-10 h-12 bg-white/20 rounded-xl w-32 mx-auto sm:mx-0"></div>
            </div>
        </div>
    );
}
