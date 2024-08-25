import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login, Profile, Signup } from './components/Auth'
import Navbar from './components/Nav'
// import FooterComponent from './components/Footer'
import { PublishPost, UpdatePost, ViewPost, ViewPostById } from './components/Post'
import { useSelector } from 'react-redux'
import { NotFound, Unauthorized } from './components/OtherPages'

function App() {
const {isAuth} =useSelector((state)=>state.user)
console.log(isAuth)
  return (
    <>
    <Navbar/>
    <Routes>

      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={isAuth?<Profile/>:<Unauthorized/>}/>
      <Route path='/publish-post' element={isAuth?<PublishPost/>:<Unauthorized/>}/>
      <Route path='/view-posts' element={<ViewPost/>}/>
      <Route path='/view-post/:id' element={<ViewPostById/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/update-post/:id' element={isAuth?<UpdatePost/>:<Unauthorized/>}/>
    </Routes>
    {/* <FooterComponent/> */}
    </>
  )
}

export default App
