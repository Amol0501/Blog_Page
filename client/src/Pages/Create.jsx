import {useNavigate} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Create = () => {
  const URL = "https://blog-page-5qk8.onrender.com/";
  const navigate = useNavigate();
  
  const submitHandler = async(e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    console.log(title, description);
    const blog = {
      title,
      description
    }

    const response = await fetch(`${URL}post-blog`, {
      method: "POST",
      headers: {
        "Content-type" : "application/json",
      },
      body : JSON.stringify(blog)
    })

    if(response.status === 200){
      e.target.title.value = "";  
      e.target.description.value = "";
      setTimeout(()=>{
        navigate("/"); 
      }, 2000)
      toast.success("Blog Post successfully");
    }
    else{
      toast.error("Something went wrong")
    }

  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    <div>
      <h1 className="text-center text-2xl font-bold pt-10 ">Create Blog</h1>
      <form className = "flex flex-col justify-center pt-10 px-[15%] gap-5" onSubmit={submitHandler}>
        <div className="flex flex-col gap-3">
          <label className="text-lg font-semibold">Title: </label>
          <input className="border border-gray-400 outline-none rounded-md p-3" placeholder="Enter the blog title" type="text" name="title" required></input>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-lg font-semibold">Description: </label>
          <textarea className="border border-gray-400 outline-none rounded-md p-3 " type="text" name="description" rows="10" required></textarea>
        </div>
        <button type="submit" className="bg-purple-400 hover:bg-purple-600 p-3 rounded-md">Post</button>
      </form>
    </div>
    </>
  )
}

export default Create