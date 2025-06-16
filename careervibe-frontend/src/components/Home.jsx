import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="hero-section bg-black bg-opacity-50">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate__animated 
        animate__zoomIn text-[rgb-accent]">Welcome to careerVibe</h1>
        <p className="text-lg md:text-xl mb-6 animate__animated animate__fadeIn 
        animate__delay-1s text-white">Discover Your Dream Jobs with Ease!</p>
        <Link to="/jobs" className="bg-[rgb-primary] text-white px-6 py-3 
        rounded-md font-semibold hover:bg-green-600 transition duration-300 
        transform hover:scale-105 animate__animated animate__bounceIn 
        animate__delay-2s">Explore Jobs</Link>
      </div>
    </div>
  );
}

export default Home;