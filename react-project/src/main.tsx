import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 引入antd的样式
import 'antd/dist/reset.css';
import zhCN from 'antd/locale/zh_CN';   //设置国际化
// 引入store
import store from './store';
import { Provider } from 'react-redux';
import{ ConfigProvider} from 'antd'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
   {/* 全局设置为中文 */}
   <ConfigProvider locale={zhCN}>    
   <Provider store={store}>  
      <App />
   </Provider>
 </ConfigProvider>
  </>
 
)
