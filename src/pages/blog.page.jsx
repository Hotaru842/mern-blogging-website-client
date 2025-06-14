import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogPage = () => {
  const { blog_id } = useParams();

  const fetchBlog = () => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
    .then(({data: { blog }}) => {
      console.log(blog);
    })
    .catch(err => {
      console.log(err);
    }) 
  }

  useEffect(() => {
    fetchBlog();
  }, [])

  return (
    <div>Blog Page for - {blog_id}</div>
  )
}

export default BlogPage;