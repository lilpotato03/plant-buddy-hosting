import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Categories from "../components/Categories"
function Landing() {

  return (
    <div className=" bg-yellow-50 w-[100vw]  text-lg">
      <Navbar />
      <div className="w-full h-[100vh] bg-green-400">      
      <Hero />
      </div>
      <div className="w-full h-[100vh] ">
        <Categories />
      </div>
      <div className="w-full h-[5vh] flex items-center justify-center bg-black text-white text-[15px] text-center jost-500">Website under development,made by Aaron...</div>

    </div>
    )
}

export default Landing
