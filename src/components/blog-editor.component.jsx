import AnimationWrapper from "../common/page-animation";
import defaultbanner from "../imgs/blog banner.png";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import { UploadImg } from "../common/aws";
import { useContext, useEffect} from "react";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import tools  from "./tools.component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
const BlogEditor = () => {
  let {blog,blog:{title,banner,content,tags,des},setBlog,textEditor,setTextEditor,setEditorState}=useContext(EditorContext)
  let{userAuth:{access_token}}=useContext(UserContext);
  let navigate=useNavigate();
useEffect((EditorContext)=>{
setTextEditor(new EditorJS({
  holder: "textEditor",
  data:content,
  tools: tools,
  placeholder:"Let's write an awesome story"
}))
},[])

  const handleBannerUpload = (e) => {
    let tst = toast.loading("Uploading...");
    let img = e.target.files[0];
    if (img) {
      UploadImg(img)
        .then((url) => {
          if (url) {

            toast.success("Uploded 👍👍");
            toast.dismiss(tst);
            setBlog({ ...blog, banner: url });
          }  
        })
        .catch((err) => {
          toast.dismiss(tst);
          toast.err(err.message);
        });
    }
  };
  //title to be in sigle line in not allowing new line by presing enter
  const handleTitlekeyDown = (e) => {
    if (e.keyCode===13){
        e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";  
    setBlog({...blog,title:input.value})
}

const handlePublish=()=>{
    if(!banner.length){
        return toast.error("Please Upload Banner")
    }
    if(!title.length){
        return toast.error("Please Enter Title")
    }
    if(textEditor.isReady){
        textEditor.save().then((data)=>{
            if(data.blocks.length){
                setBlog({...blog,content:data})
                setEditorState("publish");
            }else{
                return toast.error("Please Enter Content");
            }
           
        }).catch(err=>console.log(err))
    }
}   
const handleSaveDraft=(e)=>{
  if(e.target.className.includes('disable')){
        return;
    }
    if(!title.length){
        toast.error("Please Enter Title to Save")
}


let LoadingToast=toast.loading("Saving...");
e.target.classList.add('disable')
if(textEditor.isReady){
  textEditor.save().then((content)=>{
    let blogobj={title,banner,des,content,tags,draft:true}
axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/create-blog",blogobj,{
    headers:{'Authorization':`Bearer ${access_token}`}})
    .then(()=>{
        e.target.classList.remove('disable')
        toast.dismiss(LoadingToast)
        toast.success("Blog Saved successfully")
        setTimeout(()=>{navigate('/')},500)
    })
    .catch(({response})=>{
        e.target.classList.remove('disable')
        toast.dismiss(LoadingToast)
        toast.error(response.data.error)
    })

})

}}


  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} alt="logo" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">{title.length?title:"New Blog"}</p>
        <div className="flex gap-4 ml:auto ">
          <button className="btn-dark py-2" onClick={handlePublish}>Publish</button>
          <button className="btn-light py-2" onClick={handleSaveDraft}>Save Draft</button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img src={banner?banner:defaultbanner} className="z-20" />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
            <textarea 
              defaultValue={title}
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              placeholder="Blog Title"
              onKeyDown={handleTitlekeyDown}
              onChange={handleTitleChange}
            ></textarea>
            <hr className="w-full opacity-10 my-5" />
            <div id="textEditor" className="font-gelasio">

            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
