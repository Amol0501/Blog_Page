import { useState, useEffect } from "react"
import {AiFillDelete} from "react-icons/ai"
import {FaPencilAlt} from "react-icons/fa"
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const URL = "https://blog-page-5qk8.onrender.com/";
  const [posts, setpost] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [editId, setEditId] = useState("");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    getPost();
  }, [posts])

  const getPost = async () => {
    const response = await fetch(`${URL}get-blog`);
    const data = await response.json();
    setpost(data.blogs);
  }

  const deleteHandler = async (id) => {
    const response = await fetch(`${URL}delete-blog/${id}`, {
      method: "DELETE",
    });
    if(response.status === 200){
      toast.success("Blog deleted Successfully");
    }
    else{
      toast.error("Something went wrong");
    }
  }
  
  const updateHandler = async (id) => {
    console.log(title, description);
    const response = await fetch(`${URL}update-blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-type" : "application/json",
      },
      body : JSON.stringify({title, description})
    }); 
    if(response.status === 200){
      setEditId("");
      setEditPost(false)
      toast.success("Blog updated Successfully");
    }
    else{
      toast.error("Something went wrong");
    }
  }
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="mt-10 md:mt-16 px-10 md:px-[26%] flex flex-col gap-6 mb-8">
        {
          posts.map((post) => {
            return (
              <div className="border rounded-md shadow-md hover:shadow-lg p-4 flex flex-col gap-2 overflow-hidden" key = {post._id}>
                <div className="flex gap-3 justify-end">
                    <AiFillDelete className="cursor-pointer text-gray-400 hover:text-red-400 hover:scale-125  transition-all duration-100 ease-in" onClick= {() => deleteHandler(post._id)}/>
                    <FaPencilAlt className={`${editPost && post._id === editId ? "text-red-400 scale-110" : " " } cursor-pointer text-gray-400 hover:text-red-400 hover:scale-125 transition-all duration-100 ease-in`} onClick={() => {setEditPost(!editPost), setEditId(post._id) }}/>
                </div>
                <h2 className={`${editPost && post._id === editId ? "border p-2" : " "} text-lg font-bold`} contentEditable = {post._id === editId && editPost} onInput = {(e) => setTitle(e.target.innerText)}>{post.title}</h2>
                <div className={`${editPost && post._id === editId ? "border p-2" : " "}`} contentEditable = {post._id === editId && editPost} onInput = {(e) => setDescription(e.target.innerText)} >{post.description}</div>
                <button className={`${editPost && post._id === editId ? "block" : "hidden" } text-left bg-purple-400 hover:bg-purple-600 p-1 px-4 font-semibold w-[4rem] rounded-md text-white mt-2`} onClick = {() => updateHandler(post._id)}>Save</button>
              </div>
            )
          })
        }   
      </div>
    </>
  )
}

export default Home