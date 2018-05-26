
import React, { Component } from 'react';
import axios from "axios";

class Profile extends Component {


  constructor(props){
    super(props);
    this.base = process.env.REACT_APP_API_URL;
    this.state=({
      loading:true
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
          messege: err,
          loading: false
        });
      }
      else {
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

  }
  componentDidUpdate(){
    let myurl = `${process.env.REACT_APP_API_URL}user/${this.props.match.params.id}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        this.setState({
          messege: err,
          loading: false
        });
      }
      else {
        this.setState({
          userProfile : data,
          loading: false
        });
      }
    })
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
                  <div className='col-12 justify-content-center'> {this.state.userProfile.name} </div>
                </div>
                <div className='row'>
                  <div className='col-12 justify-content-center'> {this.state.userProfile.username} </div>
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
