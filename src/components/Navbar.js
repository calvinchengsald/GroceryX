
import React, { Component } from 'react';

import {  Link } from 'react-router-dom';
import '../css/components/Navbar.css';

class Navbar extends Component {

  constructor(props){
    super(props);
  }

  signOut = () =>{
    this.props.appModel.userModel.signOut();
    this.props.rerender("Sucessfully Signed Out");
  }

  render() {
   return (
     <div className='row bg-light' id='navbar'>
        <div className='col-12'>
          { this.props.appModel.userModel.login?
            <div>
            <div className='row justify-content-center'>
              <Link to={`/Profile/${this.props.appModel.userModel.userData.id}`} >{this.props.appModel.userModel.userData.name} </Link>
            </div>
            <div className='row justify-content-center'>
              <div className='btn' onClick={this.signOut}>Sign Out </div>
            </div>
            </div>
            :
            <div className='row justify-content-center'>
              <Link to='/SignUpIn' >Sign In </Link>
            </div>
          }


          <div className='row justify-content-center'>
            <Link to='/Group' >Group </Link>
          </div>
          <div className='row justify-content-center'>
            <Link to='/GroceryList/2' >grocerylist2 </Link>
          </div>
          <div className='row justify-content-center'>
            <Link to='/Group/1' >group1 </Link>
          </div>

        </div>
     </div>
    );
  }
}

export default Navbar;
