import { useContext } from 'react';
import { EditorContext } from '../pages/editor.page';
import { Toaster, toast } from 'react-hot-toast';
import AnimationWrapper from '../common/page-animation';

const PublishForm = () => {
  let characterLimit = 200;
  let { blog, blog: { banner, title, tags, desc }, setBlog, setEditorState } = useContext(EditorContext);

  const handleCloseEvent = () => {
    setEditorState("editor"); 
  }

  const handleBlogTitleChange = (e) => {
    let input = e.target;

    setBlog({ ...blog, title: input.value });
  }

  const handleBlogDescriptionChange = (e) => {
    let input = e.target;

    setBlog({ ...blog, desc: input.value });
  }

  const handleTitleKeyDown = (e) => {
    if(e.keyCode === 13) {
      e.preventDefault();
    }
  }

  return (
    <AnimationWrapper>
      <section className="grid items-center w-screen min-h-screen py-16 lg:grid-cols-2 lg:gap-4">
        <Toaster />
        <button className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-br-cross" />
        </button>
        <div className="max-w-[550px] center">
          <p className="mb-1 text-dark-grey">Preview</p>
          <div className="w-full mt-4 overflow-hidden rounded-lg aspect-video bg-grey">
            <img 
              src={banner}
              alt="blog banner"
            />
          </div>
          <h1 className="mt-2 text-4xl font-medium leading-tight line-clamp-2">{ title }</h1>
          <p className="mt-4 text-xl leading-7 font-gelasio line-clamp-2">{ desc }</p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="mb-2 text-dark-grey mt-9">Blog Title</p>
          <input 
            type="text" 
            placeholder="Blog Title" 
            defaultValue={title}
            className="pl-4 input-box"
            onChange={handleBlogTitleChange} 
          />

          <p className="mb-2 text-dark-grey mt-9">Short description about your blog post</p>
          <textarea
            maxLength={characterLimit}
            defaultValue={desc}
            className="h-40 pl-4 leading-7 resize-none input-box"
            onChange={handleBlogDescriptionChange}
            onKeyDown={handleTitleKeyDown}
          >

          </textarea> 
          <p className="mt-1 text-sm text-right text-dark-grey">{characterLimit - desc.length} characters left</p>
          <p className="mb-2 text-dark-grey mt-9">Topics - (Help is searching and ranking your blog post)</p>
          <div className="relative py-2 pb-4 pl-2 input-box">
            <input type="text" placeholder="Topic" 
              className="sticky top-0 left-0 pl-4 mb-3 bg-white input-box focus:bg-white"
            />
          </div>
        </div>
      </section>
    </AnimationWrapper>
  )
}

export default PublishForm;