import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'
import './index.css'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import CadastroVideo from './pages/cadastro/Video'
import CadastroCategoria from './pages/cadastro/Categoria'

const Pagina404 = () => (<div>Página 404</div>)

ReactDOM.render(
  <AlertProvider template={AlertTemplate} timeout={5000} position="top center">
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/cadastro/video" component={CadastroVideo} />
        <Route path="/cadastro/categoria" component={CadastroCategoria} />
        <Route component={Pagina404} />
      </Switch>
    </BrowserRouter>
  </AlertProvider>,
  document.getElementById('root'),
)
