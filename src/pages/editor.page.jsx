import { createContext, useContext, useState } from 'react'
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';
import BlogEditor from '../components/blog-editor.component';
import PublishForm from '../components/publish-form.component';

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  desc: "",
  author: { personal_info: { }}
}

export const EditorContext = createContext({});

const Editor = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });
  let { userAuth: { access_token }} = useContext(UserContext);

  return (
    <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}>
      {
        access_token === null ? <Navigate to="/sign-in" /> :
        editorState === "editor" ? <BlogEditor /> : <PublishForm />
      }
    </EditorContext.Provider>
  )
}

export default Editor;