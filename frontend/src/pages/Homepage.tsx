
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Scholarship Program</h1>
      <div className="flex justify-center">
        <div className="mr-4">
          <Link to="/register">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Registration Page
            </button>
          </Link>
        </div>
        <div>
          <Link to="/admin/login">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Admin Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
