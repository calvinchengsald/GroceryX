
import React, { Component } from 'react';

import {  Link } from 'react-router-dom';
import '../css/components/Navbar.css';
import '../css/App.css';

class Navbar extends Component {


  signOut = () =>{
    this.props.appModel.userModel.signOut();
    this.props.rerender("");
  }
  componentDidUpdate(){
  }

  render() {

   return (
     <div className='row' id='navbar'>
        <div className='col-12 mt-4'>
          { this.props.appModel.userModel.login?
            <div className='row justify-content-start'>
              <Link className='col-12 btn font-3 font' to={`/Profile/${this.props.appModel.userModel.userData.id}`} >{this.props.appModel.userModel.userData.name} </Link>
              <div className='col-12 btn font-3 font' onClick={this.signOut}>Sign Out </div>

              <div className='col-12'>
                <div className='row'>
                  <Link className='col-12 font-3 btn' to={'/Group'}>
                    Your Groups
                  </Link>
                  <div id='navbar-group-holder' className='col-12 font-2 justify-content-center'>
                    {this.props.appModel.userModel.userData.groupusers.map((groupuser)=>{
                      return <Link className='row justify-content-center' to={`/Group/${groupuser.group.id}`}  >
                          <div className='col-12 font-2 btn'>
                            {groupuser.group.groupName}
                          </div>
                       </Link>
                    })}
                  </div>
                </div>
              </div>
              <div className='col-12'>
                <div className='row'>
                  <div className='col-12 font-3'>
                    Your Lists
                  </div>
                  <div id='navbar-list-holder' className='col-12 font-2 justify-content-center'>
                    {this.props.appModel.userModel.userData.grocerylists.map((list)=>{
                      return <Link className='row justify-content-center' to={`/GroceryList/${list.id}`}  >
                          <div className='col-12 font-2 btn'>
                            {list.name}
                          </div>
                       </Link>
                    })}
                  </div>
                </div>
              </div>
            </div>
            :
            <Link className='col-12 font-3' to='/SignUpIn' >Sign In </Link>
          }



        </div>
     </div>
    );
  }
}

export default Navbar;
