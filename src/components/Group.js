
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Messege from './Messege';

class Group extends Component {


  constructor(props){
    super(props);
    this.base = process.env.REACT_APP_API_URL;
    this.state=({
      loading: true,
      groupView: false,
      messege: "dummy"
    })
    this.groupId;
    this.initialize();
  }
  initialize(){

  }


  componentDidMount() {

    if(this.props.match.params.groupId){
      this.groupId = this.props.match.params.groupId;
      let myurl = `${process.env.REACT_APP_API_URL}group/${this.groupId}`;
      let bodyFormData = new Object();
      bodyFormData.needJSONbreakup = "J$0nBr4k3";
      this.fetchData(myurl,bodyFormData, (err,data)=>{
        if(err){
          this.setState({
            messege: err,
            groupView: true,
            groupData : data,
          });
        }
        else {
          this.setState({
            groupData : data,
            groupView: true,
          });
        }
      })
    }
  }
  componentDidUpdate(){
    // if(this.props.match.params.groupId && this.props.match.params.groupId !== this.groupId){
    //   this.groupId = this.props.match.params.groupId;
    //   this.setState({
    //     groupView: true,
    //   })
    // }
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
    if(!this.props.appModel.userModel.login){
      this.props.history.push('/SignUpIn');
      return(<div></div>);
    }
     return (
       <section className='Group row'>
         <div className='col-12'>
           <Messege
             messege ={this.state.messege }
           />
         </div>
          <div className='col-10 offset-1 mt-4'>
            {this.state.groupView?
              <div className='row'>
                {this.state.groupData.error?
                  <div className='col-12'>
                    {this.state.groupData.error}
                  </div>
                  :
                  <div className='col-12'>
                    <h1 className='row justify-content-center'>
                      {this.state.groupData.groupName}
                    </h1>
                    <div className='row'>
                      <div className='col-8 m-1 border bg-light'>
                        <div className='row'>
                          <div className='col-12 text-primary justify-content-center'>
                            Grocery Lists
                          </div>
                        </div>
                        {this.state.groupData.grocerylists.map((grocerylist)=>{
                          return <div className='row'>
                            <Link className='col-12' to={`/grocerylist/${grocerylist.id}`}>
                              {grocerylist.name}
                            </Link>
                          </div>
                        })}
                      </div>
                      <div className='col-3 m-1 border bg-light'>
                        <div className='row'>
                          <div className='col-12 text-primary justify-content-center'>
                            Members
                          </div>
                        </div>
                        {this.state.groupData.groupusers.map((groupuser)=>{
                          return <div className='row'>
                            <Link className='col-12' to={`/profile/${groupuser.user.id}`}>
                              {groupuser.user.name}
                            </Link>
                          </div>
                        })}
                      </div>
                    </div>

                  </div>
                }
              </div>
              :
              <div className='row'>
                {this.props.appModel.userModel.userData.error?
                  <div className='col-12 justify-content-center'> {this.props.appModel.userModel.userData.error} </div>
                  :
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-12 justify-content-center'> {this.props.appModel.userModel.userData.name} </div>
                    </div>
                    <div className='row'>
                      {this.props.appModel.userModel.userData.groupusers.map((groupuser)=>{
                        return <div className='col-6 justify-content-center'>
                          <div className='row m-2 bg-light border'>
                            <Link className='col-12' to={`/group/${groupuser.group.id}`}>
                              {groupuser.group.groupName}
                            </Link>
                          </div>
                        </div>
                      })}
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

export default Group;
