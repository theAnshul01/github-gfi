import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import { Analytics } from "@vercel/analytics/next"

function App() {

  return (
    <>
      <Sidebar/>
      <Home />
      <Footer/>
      <Analytics />
    </>
  )
}

export default App
