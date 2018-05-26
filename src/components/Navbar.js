
import React, { Component } from 'react';

import {  Link } from 'react-router-dom';
import '../css/components/Navbar.css';

class Navbar extends Component {

  constructor(props){
    super(props);
  }

  render() {
   return (
     <div className='row bg-light' id='navbar'>
        <div className='col-12'>
          { this.props.appModel.userModel.login?
            <div className='row justify-content-center'>
              <Link to={`/Profile/${this.props.appModel.userModel.id}`} >{this.props.appModel.userModel.name} </Link>
            </div>
            :
            <div className='row justify-content-center'>
              <Link to='/SignUpIn' >Sign In </Link>
            </div>
          }

          <div className='row justify-content-center'>
            <Link to='/' >Landing </Link>
          </div>
          <div className='row justify-content-center'>
            <Link to='/Profile' >Profile </Link>
          </div>
          <div className='row justify-content-center'>
            <Link to='/Groups' >Groups </Link>
          </div>

        </div>
     </div>
    );
  }
}

export default Navbar;
