import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import SignUpIn from './components/SignUpIn';
import Profile from './components/Profile';
import Group from './components/Group';
import GroceryList from './components/GroceryList';
import Navbar from './components/Navbar';
import AppModel from './model/AppModel';
require('dotenv').config();

class App extends Component {

  constructor(props){
    super(props);
    this.appModel = new AppModel();
    this.customComponent = new Object();
    this.setupCustomComponent();

  }
  setupCustomComponent(comp){
    this.customComponent.profile = (props) => {
      return (
        <Profile
          appModel = {this.appModel}
          rerender = {this.rerender}
          {...props}
        />
      );
    };
    this.customComponent.signUpIn = (props) => {
      return (
        <SignUpIn
          appModel = {this.appModel}
          rerender = {this.rerender}
          {...props}
        />
      );
    };
    this.customComponent.group = (props) => {
      return (
        <Group
          appModel = {this.appModel}
          rerender = {this.rerender}
          {...props}
        />
      );
    };
    this.customComponent.groceryList = (props) => {
      return (
        <GroceryList
          appModel = {this.appModel}
          rerender = {this.rerender}
          {...props}
        />
      );
    };
  }
  rerender = () =>{
    this.setState({

    });
  }



  render() {
    return (
      <div className="App">
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-2'>
              <Navbar
                appModel={this.appModel}
              />
            </div>
            <main className='col-10'>
             <Route exact path="/" component={Landing} />
             <Route path="/Profile/:id" render={this.customComponent.profile} />
             <Route path="/SignUpIn" render={this.customComponent.signUpIn} />
             <Route path="/Group/:groupId" render={this.customComponent.group} />
             <Route exact path="/Group" render={this.customComponent.group} />
             <Route exact path="/GroceryList/:groceryListId" render={this.customComponent.groceryList} />
           </main>
          </div>



        </div>
      </div>
    );
  }
}

export default App;
