import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import Cart from './components/cart/Cart.jsx';
import {TemplateProvider} from './templates/TemplateProvider.js'
import ContextProvider from './context/contextProvider.jsx'
import DetailView from './components/ItemDetail/DetailView.jsx';


function App() {
  return (
    <TemplateProvider>
    <ContextProvider>    
    <BrowserRouter>
      <Header />
      <Switch>
              <Route exact path= '/' component={Home} />
              <Route exact path= '/cart' component={Cart} />
              <Route exact path='/product/:id' component={DetailView} />
      </Switch>
    </BrowserRouter>
    </ContextProvider>
    </TemplateProvider>

  );
}

export default App;
