import { useEffect, useState } from 'react';
import AnimationWrapper from '../common/page-animation';
import InPageNavigation from '../components/inpage-navigation.component';
import Loader from '../components/loader.component';
import axios from "axios";

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);

  const fetchLatestBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
    .then(({data}) => {
      setBlogs(data.blogs);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  return (
    <AnimationWrapper>
      <section className="flex justify-center gap-10 h-cover">
        <div className="w-full">
          <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
            <>
            {
              blogs === null ? <Loader /> : blogs.map((blog, i) => {
                return <div key={i}>
                  <h1>{blog.title}</h1>
                </div>
              })
            }
            </>
            <h1>Trending blogs here</h1>
          </InPageNavigation>
        </div>
        <div>

        </div>
      </section>
    </AnimationWrapper>
  )
}

export default HomePage;