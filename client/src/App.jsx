import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from "./Pages/Home"
import Create from "./Pages/Create"
import Navbar from './components/Navbar'
export default function App() {
  return <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/create" element = {<Create />} />
      </Routes>
    </BrowserRouter>
  </>
}