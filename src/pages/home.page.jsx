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
  let categories = ["programming", "cryptocurrency", "hollywood", "film making", "social media", "cooking", "sweet", "tech", "AI", "finances", "travel"];

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
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="mb-8 !text-xl font-medium">Stories from all interests</h2>
                <div className="flex flex-wrap gap-3">
                  {
                    categories.map((category, i) => {
                      return <button className="tag" key={i}>
                        {category}
                      </button>
                    })
                  }
                </div>
              </div>
              <div>
                <h2 className="!text-xl font-medium mb-8">
                  Trending <i className="fi fi-br-arrow-trend-up" />
                </h2>
                {
                  trendingBlogs === null ? <Loader /> : trendingBlogs.map((blog, i) => {
                    return <AnimationWrapper transition={{ duration: 1, delay: i*.1 }} key={i}>
                      <MinimalBlogCard blog={blog} index={i} />
                    </AnimationWrapper>
                  })
                }
              </div>
        </div>  
        </div>
      </section>
    </AnimationWrapper>
  )
}

export default HomePage;