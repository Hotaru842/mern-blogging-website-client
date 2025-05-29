import { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import banner from "../imgs/banner.png"; 
import { uploadImage } from "../common/aws";
import { Toaster, toast } from "react-hot-toast";

const BlogEditor = () => {
  let blogBannerRef = useRef();

  const handleBannerUpload = (e) => {
    let img = e.target.files[0]; 
    
    if(img) {
      let loadingToast = toast.loading("Uploading image...");

      uploadImage(img).then((url) => {
        if(url) {
          toast.dismiss(loadingToast);
          toast.success("Image uploaded successfully!");
          blogBannerRef.current.src = url;
        }
      }).catch((err) => {
        toast.dismiss(loadingToast);
        return toast.error(err);
      })
    }
  }

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
      <Toaster />

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative transition-opacity duration-500 bg-white border-4 aspect-video hover:opacity-60 border-grey">
              <label htmlFor="uploadBanner">
                <img 
                  ref={blogBannerRef}
                  src={banner}
                  className="z-20"
                />
                <input 
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  )
}

export default BlogEditor;