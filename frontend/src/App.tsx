import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import CalculadoraPlano from './pages/Calculadora'
import Vendas from './pages/Vendas'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import AuthRouter from './pages/AuthRouter'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route element={<AuthRouter />}>
        <Route path='/' element={<Vendas></Vendas>}></Route>

        <Route path='/calculadora_plano' element={<CalculadoraPlano></CalculadoraPlano>}></Route>
        <Route path='/cadastro/:plan/:phone/:computer/:smarttv/:tvbox/:other/:gamer' element={<Cadastro />}></Route>

      </Route>
      <Route path='*' element={<Navigate to="/" />}></Route>
    </Routes>
  )
}

export default App
