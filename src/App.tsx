import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { MainLayout } from './layout/MainLayout/MainLayout'
import { SubCategoryList } from './pages/SubCategoryList'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='subcategory' element={<SubCategoryList />} />
        </Route>
      </Routes>
    </>
  )
}

export default App