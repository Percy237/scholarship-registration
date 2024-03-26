
const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="logo.png" alt="Scholarship Program Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-lg font-bold">Scholarship Program</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#about" className="hover:text-gray-300">About</a></li>
            <li><a href="#registration" className="hover:text-gray-300">Registration</a></li>
            <li><a href="#faq" className="hover:text-gray-300">FAQ</a></li>
            <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
