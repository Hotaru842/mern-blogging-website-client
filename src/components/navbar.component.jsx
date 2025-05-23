import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="flex-none w-10 h-10 cursor-pointer"> 
        <img src={logo} alt="logo" className="flex-none w-full" />
      </Link> 
      <div className="absolute left-0 w-full bg-white top-full mt-0.5 border-b border-grey py-4 px-[5vw]">
        <input 
          type="text"
          placeholder="Search"
          className="w-full p-4 pl-6 md:w-auto bg-grey pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey"
        />
      </div>
    </nav>
  )
}

export default Navbar;