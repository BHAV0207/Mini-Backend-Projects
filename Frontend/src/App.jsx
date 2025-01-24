import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import HomePage from './Pages/HomePage'

import { useState } from 'react'

function App() {
  let [userId , setUserId] = useState('');
  console.log(userId);

  return (
   <Router>
    <Routes>
      <Route path='/' element={<LoginPage setUserId={setUserId}></LoginPage>}></Route>
      <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
      <Route path='/home' element={<HomePage></HomePage>} />
    </Routes>
   </Router>
  )
}

export default App
