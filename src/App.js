import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import SignUpIn from './components/SignUpIn';
import Profile from './components/Profile';
import Group from './components/Group';
import GroceryList from './components/GroceryList';
import Navbar from './components/Navbar';
import AppModel from './model/AppModel';
import Messege from './components/Messege';
import $ from 'jquery';
require('dotenv').config();

class App extends Component {

  constructor(props){
    super(props);
    this.appModel = new AppModel();
    this.customComponent = new Object();
    this.setupCustomComponent();
    this.state={
        loading:true,
        messege:'-'
    };

  }
  setupCustomComponent(comp){
    this.customComponent.profile = (props) => {
      return (
        <Profile
          appModel = {this.appModel}
          rerender = {(msg) => this.rerender(msg)}
          hideSidebar = {()=>this.hideSidebar()}
          {...props}
        />
      );
    };
    this.customComponent.signUpIn = (props) => {
      return (
        <SignUpIn
          appModel = {this.appModel}
          rerender = {(msg) => this.rerender(msg)}
          hideSidebar = {()=>this.hideSidebar()}
          {...props}
        />
      );
    };
    this.customComponent.group = (props) => {
      return (
        <Group
          appModel = {this.appModel}
          rerender = {(msg) => this.rerender(msg)}
          hideSidebar = {()=>this.hideSidebar()}
          {...props}
        />
      );
    };
    this.customComponent.groceryList = (props) => {
      return (
        <GroceryList
          appModel = {this.appModel}
          rerender = {(msg) => this.rerender(msg)}
          hideSidebar = {()=>this.hideSidebar()}
          {...props}
        />
      );
    };
  }
  rerender(msg){
    if(msg){
      if(msg==="~"){
        return this.setState({

        });
      }
      this.setState({
        messege: msg
      });
    }
    else {
      this.setState({
        messege: '-'
      });
    }
  }

  componentDidMount(){
    this.setState({
      loading:false
    });
  }
  toggleSidebar = () =>{
    let element = $('#sidebar');
    if(element.position().left >= 0){
      element.animate({"left": '-=40vw'})
    }
    else {
      element.animate({"left": '+=40vw'})
    }
  }
  hideSidebar(){

    let element = $('#sidebar');
    if(element.position().left >= 0){
      element.animate({"left": '-=40vw'})
    }
  }



  render() {

    if(this.state.loading){
      return (<div>Loading</div>);
    }
    return (
      <div className="App">
        <div className='container-fluid'>
          <div className='row'>
            <div className='d-none d-md-block col-2'>
              <Navbar
                appModel={this.appModel}
                rerender={(msg)=>this.rerender(msg)}
                hideSidebar={()=>this.hideSidebar()}
              />
            </div>
            <div id='sidebar-toggle' className='d-block d-md-none glyphicon glyphicon-list btn' onClick={this.toggleSidebar} > </div>
            <div id="sidebar" className='d-block d-md-none'>
              <Navbar
                appModel={this.appModel}
                rerender={(msg)=>this.rerender(msg)}
              />
            </div>
            <main className='col'>
                <Messege
                  messege = {this.state.messege}
                  rerender={(msg)=>this.rerender(msg)}
                />
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
