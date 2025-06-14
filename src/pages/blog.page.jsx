import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import axios from "axios"; 
import { getDay } from "../common/date";

export const blogStructure = {
  title: "",
  desc: "",
  content: [],
  tags: [],
  author: { personal_info: {}},
  banner: "",
  publishedAt: "",
}

const BlogPage = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(blogStructure);
  const [loading, setLoading] = useState(true);
  const { title, content, banner, author: { personal_info: {
    fullname, username: author_username, profile_img
  }}, publishedAt } = blog;

  const fetchBlog = () => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
    .then(({data: { blog }}) => {
      setBlog(blog);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    }) 
  }

  useEffect(() => {
    fetchBlog();
  }, [])

  return (
    <AnimationWrapper>
      {
        loading ? <Loader /> : 
        <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
          <img src={banner} alt={title} className="aspect-video" />

          <div className="mt-12">
            <h2>{title}</h2>
            <div className="flex justify-between my-8 max-sm:flex-col">
              <div className="flex items-start gap-5">
                <img src={profile_img} alt={author_username} className="w-12 h-12 rounded-full" />
                <div className="flex flex-col items-start justify-center">
                  <p className="capitalize">
                    {fullname}
                  </p>
                  <p>
                  @<Link to={`/user/${author_username}`} className="underline">{author_username}</Link>
                  </p>
                </div>
              </div>
              <p className="opacity-75 text-dark-grey max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">Published on {getDay(publishedAt)}</p>
            </div>
          </div>

          {/* <BlogInteraction /> */}
        </div>
      }
    </AnimationWrapper>
  )
}

export default BlogPage;