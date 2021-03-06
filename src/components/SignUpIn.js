
import React, { Component } from 'react';
//import bcrypt from 'bcryptjs';
import '../css/App.css';

class SignUpIn extends Component {
  constructor(props){
    super(props);
    this.initializeRefs();
    this.base = process.env.REACT_APP_API_URL;
    //this.bcrypt = require('bcrypt');
    //this.salt = bcrypt.genSaltSync();
  }

  initializeRefs(){
    this.refSignInUsername = React.createRef();
    this.refSignInPassword = React.createRef();
    this.refSignUpUsername = React.createRef();
    this.refSignUpPassword = React.createRef();
    this.refSignUpConfirmPassword = React.createRef();
    this.refSignUpName = React.createRef();

  }
  componentDidMount() {
    if(this.props.appModel.userModel.login){
      this.props.history.push('/');
    }
    return this.props.rerender("");
  }
  handleSignIn = () => {
    if(this.props.appModel.userModel.login){
      return this.props.rerender("You are already logged in!");
    }
    if(!this.refSignInUsername.current.value){
      return this.props.rerender("Please enter username");
    }
    else if(!this.refSignInPassword.current.value){
      return this.props.rerender("Please enter password");
    }
    else {
      let myurl = `${this.base}user/signIn`;
      let bodyFormData = {};
      bodyFormData.needJSONbreakup = "J$0nBr4k3";
      bodyFormData.username = this.refSignInUsername.current.value.toLowerCase();
  //    bodyFormData.password = bcrypt.hashSync(this.refSignInPassword.current.value, this.salt);
      bodyFormData.password = this.refSignInPassword.current.value;
      this.fetchData(myurl,bodyFormData, (err,data)=>{
        if(err){
          return this.props.rerender(err);
        }
        else {
          if(data.error){
            return this.props.rerender(data.error);
          }
          this.props.appModel.userModel.name = data.name;
          this.props.appModel.userModel.username = data.username;
          this.props.appModel.userModel.login = true;
          this.props.appModel.userModel.id = data.id;
          this.props.appModel.userModel.setUserData(data);
          this.props.rerender("Welcome "+data.name);
          this.props.history.push('/Group');
        }
      })
    }
  }
  handleSignUp = () => {
    if(this.props.appModel.userModel.login){
      return this.props.rerender("You must log out first!");
    }
    if(!this.refSignUpUsername.current.value){
      // this.setState({
      //   messege : "Please enter username",
      // });
      return this.props.rerender("Please enter username");
    }
    else if(!this.refSignUpName.current.value){
      // this.setState({
      //   messege : "Please enter a name",
      // });
      return this.props.rerender("Please enter a name");
    }
    else if(!this.refSignUpPassword.current.value){
      // this.setState({
      //   messege : "Please enter password",
      // });
      return this.props.rerender("Please enter password");
    }
    else if(this.refSignUpConfirmPassword.current.value !== this.refSignUpPassword.current.value ){
      // this.setState({
      //   messege : "Passwords do not match",
      // });
      return this.props.rerender("Passwords do not match");
    }
    else {
      let myurl = `${this.base}user/create`;
      let bodyFormData = {};
      bodyFormData.needJSONbreakup = "J$0nBr4k3";
      bodyFormData.username = this.refSignUpUsername.current.value.toLowerCase();
      //bodyFormData.password =   bcrypt.hashSync(this.refSignUpPassword.current.value,this.salt);
      bodyFormData.password =   this.refSignUpPassword.current.value;
      bodyFormData.name = this.refSignUpName.current.value;
      this.fetchData(myurl,bodyFormData, (err,data)=>{
        if(err){
          // this.setState({
          //   messege: err
          // });
          return this.props.rerender(err);
        }
        else {
          if(data.error){
            // return this.setState({
            //   messege: data.error
            // });
            return this.props.rerender(data.error);
          }
          else {
            this.props.appModel.userModel.name = data.name;
            this.props.appModel.userModel.username = data.username;
            this.props.appModel.userModel.login = true;
            this.props.appModel.userModel.id = data.id;
            this.props.appModel.userModel.setUserData(data);
            // this.setState({
            //   messege: "Account Created!\nWelcome "+data.name
            // });
            this.props.rerender("Account Created!\nWelcome "+data.name);
          }
        }
      })
    }
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
      console.log(error);
      return callback("Something went wrong with the server");

    });
  }

  render() {
   return (
     <section className='SignUpIn row mt-4'>
        <div className='col-6'>
          <div className = 'row m-1 justify-content-center border bg-light border-secondary'>
            <div className='col-12'>
              <div className='row'>
                <div className='col-12 font-4'>Sign In</div>
              </div>
              <div className='row'>
                <div className='col-3 offset-1 font-2'>Username: </div>
                <input type='text' placeholder='Username' ref={this.refSignInUsername}  className='col-5 offset-1 font-2'/>
              </div>
              <div className='row'>
                <div className='col-3 offset-1 font-2'>Password: </div>
                <input type='password' placeholder='Password' ref={this.refSignInPassword}  className='col-5 offset-1 font-2'/>
              </div>
              <div className='row justify-content-center'>
                <div className='btn btn-primary  font-3' onClick={this.handleSignIn}> Sign In </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-6'>
        <div className = 'row m-1 justify-content-center border bg-light border-secondary'>
          <div className='col-12'>
            <div className='row'>
              <div className='col-12 font-4'>Sign Up</div>
            </div>
            <div className='row'>
              <div className='col-3 offset-1  font-2'>Username: </div>
              <input placeholder='Username' ref={this.refSignUpUsername} type='text' className='col-5 offset-1 font-2'/>
            </div>
            <div className='row'>
              <div className='col-3 offset-1 font-2'>Name: </div>
              <input placeholder='Name' ref={this.refSignUpName} type='text' className='col-5 offset-1 font-2'/>
            </div>
            <div className='row'>
              <div className='col-3 offset-1 font-2'>Password: </div>
              <input placeholder='Password' ref={this.refSignUpPassword} type='password' className='col-5 offset-1 font-2'/>
            </div>
            <div className='row'>
              <div className='col-3 offset-1 font-2'>Confirm Password: </div>
              <input placeholder='Password' ref={this.refSignUpConfirmPassword} type='password' className='col-5 offset-1 font-2'/>
            </div>
            <div className='row justify-content-center'>
              <div className='btn btn-primary font-3' onClick={this.handleSignUp}> Sign Up </div>
            </div>
          </div>
        </div>
        </div>

     </section>
    );
  }
}

export default SignUpIn;
