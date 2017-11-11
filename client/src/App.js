import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';
import Main from './app/components/Main.js';

/*const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Category = () => (
  <div>
    <h2>Category</h2>
  </div>
)

const Products = () => (
  <div>
    <h2>Products</h2>
  </div>
)*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;



/*<div>
<nav className="navbar navbar-light">
  <ul className="nav navbar-nav">

    <li><Link to="/home">Homes</Link></li>
    <li><Link to="/category">Category</Link></li>
    <li><Link to="/products">Products</Link></li>

  </ul>
 </nav>

   <Route exact path="/" render={() => (
     <Redirect to="/home"/>
     )}/>
   <Route exact path="/home" component={Home}/>
   <Route path="/category" component={Category}/>
   <Route path="/products" component={Products}/>

</div>*/
