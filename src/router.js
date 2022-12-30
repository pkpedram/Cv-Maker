import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginPage from './views/login'
import HomePage from './views/home'
const CostumeRouter = ({isLogin}) => {

  let routes = [
    {
      path: '/',
      element:  <HomePage />
    }
  ]

  return (
    <BrowserRouter>
    {
   
      <Routes>
        {
          routes.map((item) => <Route path={item.path} element={item.element} />)
        }
      </Routes>
    }
    </BrowserRouter>
  )
}
const mapStateToProps = state => ({
isLogin: state.userState.isLogin
})
const mapDispatchToProps ={

}

export default connect(mapStateToProps, mapDispatchToProps)(CostumeRouter)