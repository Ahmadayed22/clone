
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";

import LogIn from "./pages/LogIn";
import { Header } from "./component/Header";

import Shope from './pages/Shope'
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import { Footer2 } from "./component/Footer2";
import Createuser from "./component/Createuser";
import Updateuser from "./component/Updateuser";

function App() {

  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/shope" element={<Shope />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createuser" element={<Createuser />} />
          <Route path="/updateuser/:userId" element={<Updateuser />} />
        </Routes>
        <Footer2 />
      </Router>
    </>
  )
}





export default App
