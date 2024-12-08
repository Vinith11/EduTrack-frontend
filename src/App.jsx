import { Link } from 'react-router'
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Link to="/home1"> Home 1</Link>
      <Link to="/home2"> Home 2</Link>
      <Link to="/home3"> Home 3</Link>
      <br />
      <Link to="/signin"> sign In</Link>

      <br />
      <Link to="/signup"> sign Up</Link>
    </>
  )
}

export default App
