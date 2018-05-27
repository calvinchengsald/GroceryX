
import React, { Component } from 'react';
import Messege from './Messege';
import {Link} from 'react-router-dom';

class Profile extends Component {


  constructor(props){
    super(props);
    this.base = process.env.REACT_APP_API_URL;
    this.state=({
      loading:true,
      messege: "dummy",
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
         <div className='col-12'>
           <Messege
             messege ={this.state.messege }
           />
         </div>
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
