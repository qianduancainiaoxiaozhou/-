import React,{Suspense} from 'react'  //路由懒加载组件引入
import { BrowserRouter } from 'react-router-dom'   //引入路由的模式
import AddRouter from './router/AddRouter'
const App = () => {

  return (
    <Suspense fallback={<h1>加载中....</h1>}>
      <BrowserRouter>
         <AddRouter></AddRouter>
      </BrowserRouter>
    </Suspense>
  )
}

export default App