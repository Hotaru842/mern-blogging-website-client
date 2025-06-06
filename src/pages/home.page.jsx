import { useEffect, useState } from 'react';
import AnimationWrapper from '../common/page-animation';
import InPageNavigation from '../components/inpage-navigation.component';
import Loader from '../components/loader.component';
import axios from "axios";
import BlogPostCard from '../components/blog-post.component';
import MinimalBlogCard from '../components/nobanner-blog-post.component';

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);

  const fetchLatestBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
    .then(({data}) => {
      setBlogs(data.blogs);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const fetchTrendingBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
    .then(({data}) => {
      setTrendingBlogs(data.blogs);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchLatestBlogs();
    fetchTrendingBlogs();
  }, []);

  return (
    <AnimationWrapper>
      <section className="flex justify-center gap-10 h-cover">
        <div className="w-full">
          <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
            <>
              {
                blogs === null ? <Loader /> : blogs.map((blog, i) => {
                  return <AnimationWrapper transition={{ duration: 1, delay: i*.1 }} key={i}>
                    <BlogPostCard content={blog} author={blog.author.personal_info} />
                  </AnimationWrapper>
                })
              }
            </>
            <>
              {
                 trendingBlogs === null ? <Loader /> : trendingBlogs.map((blog, i) => {
                  return <AnimationWrapper transition={{ duration: 1, delay: i*.1 }} key={i}>
                    <MinimalBlogCard blog={blog} index={i} />
                  </AnimationWrapper>
                })
              }
            </>
          </InPageNavigation>
        </div>
        <div>

        </div>
      </section>
    </AnimationWrapper>
  )
}

export default HomePage;