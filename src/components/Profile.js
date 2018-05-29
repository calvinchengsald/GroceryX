
import React, { Component } from 'react';
import Messege from './Messege';
import {Link} from 'react-router-dom';
import $ from "jquery";

class Profile extends Component {


  constructor(props){
    super(props);
    this.base = process.env.REACT_APP_API_URL;
    this.state=({
      loading:true,
    })
    this.initializeUser();
  }
  initializeUser(){
    let myurl = `${process.env.REACT_APP_API_URL}user/${this.props.match.params.id}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        this.setState({
          loading: false
        });
        return this.props.rerender(err);
      }
      else {
        if(data.error){
          this.props.rerender("Failed to load user data, please refresh the page");
        }
        this.setState({
          userProfile : data,
          loading: false
        });
      }
    })
  }

  componentDidMount() {
    // if(!this.props.appModel.userModel.login){
    //   this.props.history.push('/SignUpIn');
    // }
    // console.log(this.props.appModel.userModel.login && this.props.appModel.userModel.userData.id==this.props.match.params.id));
    // console.log(this.props.appModel.userModel.login );
    // console.log(this.props.appModel.userModel.login );

    return this.props.rerender("");

  }
  componentDidUpdate(){
    // let myurl = `${process.env.REACT_APP_API_URL}user/${this.props.match.params.id}`;
    // let bodyFormData = new Object();
    // bodyFormData.needJSONbreakup = "J$0nBr4k3";
    // this.fetchData(myurl,bodyFormData, (err,data)=>{
    //   if(err){
    //     this.setState({
    //       messege: err,
    //       loading: false
    //     });
    //   }
    //   else {
    //     this.setState({
    //       userProfile : data,
    //       loading: false
    //     });
    //   }
    // })
  }

  fetchData(myurl,bodyFormData, callback){
    fetch(myurl, {
      body : JSON.stringify(bodyFormData),
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html',
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
    .then((response) => {
      return response.json();
    })
    .then( (data)=> {
      return callback(null, data);
    })
    .catch((error) =>{
      return callback("Something went wrong with the server");

    });
  }



  changePassword = () =>{
    if(!this.props.appModel.userModel.login){
      // return this.setState({
      //   messege: "You need to sign in first"
      // });
      return this.props.rerender("You need to sign in first");
    }
    if(this.props.appModel.userModel.userData.id != this.props.match.params.id){
      // return this.setState({
      //   messege: "You are not authorized for this action"
      // });
      return this.props.rerender("You are not authorized for this action");
    }
    let newPassword = $('#new-password').val();
    if(newPassword !== $('#new-password-confirm').val()){
      // this.setState({
      //   messege: "Passwords do not match"
      // });
      return this.props.rerender("Passwords do not match");
    }
    let oldPassword = $('#confirm-password').val();
    let myurl = `${process.env.REACT_APP_API_URL}user/update/${this.props.appModel.userModel.userData.id}/password`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    bodyFormData.oldPassword = oldPassword;
    bodyFormData.newPassword = newPassword;
    bodyFormData.username = this.props.appModel.userModel.userData.username;
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        // this.setState({
        //   messege: err,
        //   loading: false
        // });
        return this.props.rerender(err);
      }
      else {
        if(data.error){
            // this.setState({
            //   messege:data.error
            // });
            return this.props.rerender(data.error);
        }
        else {
            this.props.appModel.userModel.updateUserData();
            this.setState({
              userProfile : this.props.appModel.userModel.userData,
              loading: false,
            });
            this.props.rerender("Password Changed");
            $("#change-password-form").slideUp('400', function(){
                $("#change-password-btn").slideDown();
            });
        }
      }
    })

  }

  showChangePassword = () => {
    if(!this.props.appModel.userModel.login){
      // return this.setState({
      //   messege: "You need to sign in first"
      // });
      return this.props.rerender("You need to sign in first");
    }
    $('#change-password-form').removeClass('d-none');

    $("#change-password-btn").slideUp('400', function(){
        $("#change-password-form").slideDown();
    });
  }
  hideChangePassword = () => {
    $("#change-password-form").slideUp('400', function(){
        $("#change-password-btn").slideDown();
    });
  }




  render() {
   return (
     <section className='Profile row'>
        <div className='col-10 offset-1 mt-4'>
          {this.state.loading?
            <div> loading </div>
            :
            <div className='row'>
            {this.state.userProfile.error?
              <div className='col-12 justify-content-center'> {this.state.userProfile.error} </div>
              :
              <div className='col-12'>
                <div className='row'>
                  <div className='col-12 text-left'>Name: {this.state.userProfile.name} </div>
                </div>
                <div className='row'>
                  <div className='col-12  text-left'>Username: {this.state.userProfile.username} </div>
                </div>
                <div className='row'>
                  <div id='change-password-btn' onClick={this.showChangePassword} className={`col-12  btn btn-secondary text-left `+((this.props.appModel.userModel.login && this.props.appModel.userModel.userData.id==this.props.match.params.id)? '' : ' d-none')} onClick={this.showChangePassword} >Change Password </div>
                  <div id='change-password-form' onMouseLeave={this.hideChangePassword} className='col-12 d-none' >
                    <div className='row'>
                      <input type='password' id='confirm-password' className='col-6' placeholder="Password"/>
                    </div>
                    <div className='row'>
                      <input type='password' id='new-password' className='col-6' placeholder="New Password"/>
                    </div>
                    <div className='row'>
                      <input type='password' id='new-password-confirm' className='col-6' placeholder="Confirm New Password"/>
                    </div>
                    <div className='row'>
                      <div className='col-6 btn btn-primary' onClick={this.changePassword}> Submit </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <div className='row p4 border bg-light'>
                      <div className='col-12'>
                        <div className='row justify-content-center text-primary'>
                          Groups
                        </div>
                        {this.state.userProfile.groupusers.map((groupuser,index)=>{
                          return <div key={`groupuser-${index}`} className='row'>
                            <Link className='col-12' to={`/group/${groupuser.group.id}`}>
                              {groupuser.group.groupName}
                            </Link>
                          </div>
                        })}
                      </div>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='row p4 border bg-light'>
                      <div className='col-12'>
                        <div className='row justify-content-center text-primary'>
                          Grocery Lists
                        </div>
                        {this.state.userProfile.grocerylists.map((grocerylist,index)=>{
                          return <div key={`groupuser-${index}`} className='row'>
                            <Link className='col-12' to={`/grocerylist/${grocerylist.id}`}>
                              {grocerylist.name}
                            </Link>
                          </div>
                        })}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            }
            </div>
          }
        </div>

     </section>
    );
  }
}

export default Profile;
