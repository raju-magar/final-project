import { motion } from "framer-motion";

export default function SkeletonLoader({ type = "dashboard" }) {
  if (type === "dashboard") {
    return (
      <div>
        <div className="h-12 w-64 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
        <div className="h-6 w-48 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-xl animate-pulse"></div>
          ))}
        </div>
        
        <div className="h-8 w-48 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
        <div className="bg-gray-200 h-64 rounded-xl animate-pulse"></div>
      </div>
    );
  }
  
  return null;
}