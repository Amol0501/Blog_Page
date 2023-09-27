import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className=" w-[100%] flex justify-center items-center gap-9 text-lg font-bold shadow-md  py-3  ">
        {/* <Link to="/" className="hover:border-b-2 hover:border-b-pink-700 duration-200  transition-all ease-in-out">Home</Link> */}
        <Link to="/" className="">Home</Link>
        <Link to="/create">Create</Link>
    </nav>
  )
}

export default Navbar