import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";

const BlogEditor = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} alt="logo" />
        </Link>
        <p className="w-full text-black max-md:hidden line-clamp-1">
          New Blog
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark">
            Publish
          </button>
          <button className="btn-light">
            Save Draft
          </button>
        </div>
      </nav>
    </>
  )
}

export default BlogEditor;