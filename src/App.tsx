import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { MainLayout } from './layout/MainLayout/MainLayout'
import { SubCategoryList } from './pages/SubCategoryList'
import { CreateCategory } from './pages/Create'
import { EditCategory } from './pages/Edit/Edit'
import { CreateSub } from './pages/CreateSub'
import { EditSub } from './pages/EditSub'
import { Brands } from './pages/Brands'
import { CreateBrands } from './pages/CreateBrands'
import { EditBrands } from './pages/EditBrands'
import { Atributes } from './pages/Atributes'
import { AttributeCreate } from './pages/AttributeCreate'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='subcategory' element={<SubCategoryList />} />
          <Route path='brands' element={<Brands />} />
          <Route path='attribute' element={<Atributes />} />
          <Route path="create" element={<CreateCategory />} />
          <Route path="createSub" element={<CreateSub />} />
          <Route path='createBrands' element={<CreateBrands />} />
          <Route path='createAttributes' element={<AttributeCreate />} />
          <Route path='edit-category/:id' element={<EditCategory />} />
          <Route path='edit-subcategory/:id' element={<EditSub />} />
          <Route path='edit-brands/:id' element={<EditBrands />} />
        </Route>
      </Routes>
    </>
  )
}

export default App