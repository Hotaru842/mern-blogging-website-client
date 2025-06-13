import { useParams } from 'react-router-dom';

const BlogPage = () => {
  const { blog_id } = useParams();

  return (
    <div>Blog Page for - {blog_id}</div>
  )
}

export default BlogPage;