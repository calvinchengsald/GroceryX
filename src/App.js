import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='container'>
          <nav>
               <Link to='/'>Landing</Link>
               <Link to='/library'>Library</Link>
          </nav>
          <div className='col-6 border bg-light'>
           HOMEZ PAGE
          </div>
          <main>
           <Route exact path="/" component={Landing} />
           <Route path="/library" component={Library} />
         </main>
        </div>
      </div>
    );
  }
}

export default App;
