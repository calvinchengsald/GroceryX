
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Messege from './Messege';
import $ from "jquery";

class Group extends Component {


  constructor(props){
    super(props);
    this.base = process.env.REACT_APP_API_URL;
    this.state=({
      loading: true,
      groupView: false,
    })
    this.groupId;
    this.initialize();
  }
  initialize(){
    this.refAddMemberUsername = React.createRef();
    this.refAddGroceryListName = React.createRef();
    this.refCreateGroupName = React.createRef();
    this.refEditGroupName = React.createRef();
  }
  componentDidUpdate(){

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
            groupView: true,
            groupData : data,
          });
          return this.props.rerender("Error loading group, please refresh the page");
        }
        else {
          if(data.error){
            // return this.setState({
            //   messege:data.error
            // });
            return this.props.rerender("Error loading group, please refresh the page");
          }
          this.setState({
            groupData : data,
            groupView: true,
          });
          return this.props.rerender("");
        }
      })
    }
    this.listenId = setInterval(()=>{this.handleSafeReload()},1000);
  }

  componentWillUnmount(){
    clearInterval(this.listenId);
  }
  handleSafeReload(){
    if(this.props.match.params.groupId){
      this.reloadGroupData();
    }
    else {
      this.props.appModel.userModel.updateUserData(()=>{
        this.props.rerender("~");
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
      return callback("Something went wrong with the server");

    });
  }
  addMember(){

  }
  showInviteMember =() =>{
    if(!this.props.appModel.userModel.isPartOfGroup(this.state.groupData)){
      return this.props.rerender("You are not authorized to do that");
    }
    $('#toggle-invite-member').addClass('d-none');
    $('#invite-member').removeClass('d-none');
    $('#invite-member-username').focus();
  }
  hideInviteMember= () =>{
    $('#invite-member').addClass('d-none');
    $('#toggle-invite-member').removeClass('d-none');
  }
  showCreateGroceryList =() =>{
    if(!this.props.appModel.userModel.isPartOfGroup(this.state.groupData)){
      return this.props.rerender("You are not authorized to do that");
    }
    $('#toggle-create-grocery-list').addClass('d-none');
    $('#create-grocery-list').removeClass('d-none');
    $('#create-grocery-list-name').focus();
  }
  hideCreateGroceryList= () =>{
    $('#toggle-create-grocery-list').removeClass('d-none');
    $('#create-grocery-list').addClass('d-none');
  }
  showCreateGroup =() =>{
    $('#toggle-create-group').addClass('d-none');
    $('#create-group').removeClass('d-none');
    $('#create-group-name').focus();
  }
  hideCreateGroup(){
    $('#toggle-create-group').removeClass('d-none');
    $('#create-group').addClass('d-none');
  }
  hideEditGroupName =() =>{
    $('#edit-group-name').addClass('d-none');
    $('#group-name').removeClass('d-none');
    this.editGroupName();
  }
  showEditGroupName = () =>{
    if(this.props.appModel.userModel.isPartOfGroup(this.state.groupData)){
      $('#edit-group-name').removeClass('d-none');
      $('#group-name').addClass('d-none');
      $('#edit-group-name').focus();
    }
  }
  editGroupName(){
    if(!this.props.appModel.userModel.isPartOfGroup(this.state.groupData)){
      return this.props.rerender("You are not authorized to do that");
    }
    let editGroupName = this.refEditGroupName.current.value;

    if(this.state.groupData.groupName === editGroupName){
      return;
    }
    if(!editGroupName){
      // this.setState({
      //   messege: "Please enter a valid group name",
      // })
      return this.props.rerender("Please enter a valid group name");
    }
    let myurl = `${process.env.REACT_APP_API_URL}group/update/${this.state.groupData.id}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    bodyFormData.groupName = editGroupName;
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        // this.setState({
        //   messege: err,
        //   groupView: true,
        // });
        return this.props.rerender(err);
      }
      else {
        if(data.error){
          // this.setState({
          //   messege: data.error,
          //   groupView: true,
          // })
          return this.props.rerender(data.error);
        }
        this.reloadGroupData();
      }
    })
  }
  leaveGroup = () =>{
    if(!this.props.appModel.userModel.isPartOfGroup(this.state.groupData)){
      // this.setState({
      //   messege: "You are not a part of this group"
      // });
      return this.props.rerender("You are not a part of this group");
    }
    let myurl = `${process.env.REACT_APP_API_URL}groupUser/leave`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    bodyFormData.userId = this.props.appModel.userModel.id;
    bodyFormData.groupId = this.state.groupData.id;
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        // this.setState({
        //   messege: err,
        //   groupView: true,
        // });
        return this.props.rerender(err);
      }
      else {
        if(data.error){
          return this.props.rerender(data.error);
        }
        this.props.history.push("/Group");
        return this.props.appModel.userModel.updateUserData(()=>{
          this.props.rerender("Successfully left group");
        });
      }
    })

  }
  addMemberToGroup = (e) => {
    if(!this.props.appModel.userModel.isPartOfGroup(this.state.groupData)){
      return this.props.rerender("You are not authorized to do that");
    }
    let addUsername = this.refAddMemberUsername.current.value;
    if(!addUsername){
      // this.setState({
      //   messege: "Please enter a valid username",
      // })
      return this.props.rerender("Please enter a valid username");
    }
    let myurl = `${process.env.REACT_APP_API_URL}user/search/username/${addUsername}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        // this.setState({
        //   messege: err,
        //   groupView: true,
        // });
        return this.props.rerender(err);
      }
      else {
        if(data.error){
          return this.props.rerender(data.error);
        }
        let myurl = `${process.env.REACT_APP_API_URL}groupUser/create`;
        let bodyFormData = new Object();
        bodyFormData.needJSONbreakup = "J$0nBr4k3";
        bodyFormData.userId = data.id;
        bodyFormData.groupId = this.state.groupData.id;
        this.fetchData(myurl,bodyFormData, (err,data2)=>{
          if(err){
            // this.setState({
            //   messege: err,
            //   groupView: true,
            // });
            return this.props.rerender(err);
          }
          else {
            if(data2.error){
              return this.props.rerender(data2.error);
            }
            this.reloadGroupData();
            // this.setState({
            //   messege: "Successfully added user",
            //   groupView: true,
            // });
            return this.props.rerender("Successfully added user");
          }
        })
      }
    })
  }
  createGroup = (e) =>{
    let createGroupName = this.refCreateGroupName.current.value;
    if(!createGroupName){
      // this.setState({
      //   messege: "Please enter a valid group name",
      // })
      return this.props.rerender("Please enter a valid group name");
    }
    let myurl = `${process.env.REACT_APP_API_URL}group/create`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    bodyFormData.groupName = createGroupName;
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        // this.setState({
        //   messege: err,
        //   groupView: true,
        // });
        return this.props.rerender(err);
      }
      else {
        if(data.error){
          // this.setState({
          //   messege: data.err,
          //   groupView: true,
          // });
          return this.props.rerender(data.error);
        }
        let myurl = `${process.env.REACT_APP_API_URL}groupUser/create`;
        let bodyFormData = new Object();
        bodyFormData.needJSONbreakup = "J$0nBr4k3";
        bodyFormData.userId = this.props.appModel.userModel.userData.id;
        bodyFormData.groupId = data.id;
        this.fetchData(myurl,bodyFormData, (err,data)=>{
          if(err){
            // this.setState({
            //   messege: err,
            //   groupView: false,
            // });
            return this.props.rerender(err);
          }
          else {
            if(data.error){
              // this.setState({
              //   messege: "Unable to add user to group",
              //   groupView: false,
              // });
              return this.props.rerender("Unable to add user to group");
            }

            this.hideCreateGroup();
            return this.props.appModel.userModel.updateUserData(()=>{
              this.props.rerender("Successfully created Group");
            });

          }
        })
      }
    })
  }
  createGroceryList = (e) =>{
    let addGroceryListName = this.refAddGroceryListName.current.value;
    if(!addGroceryListName){
      // this.setState({
      //   messege: "Please enter a valid list name",
      // })
      return this.props.rerender("Please enter a valid list name");
    }
    let myurl = `${process.env.REACT_APP_API_URL}groceryList/create`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    bodyFormData.name = addGroceryListName;
    bodyFormData.groupId = this.state.groupData.id;
    bodyFormData.ownerId = this.props.appModel.userModel.id;
    bodyFormData.private = false;
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        // this.setState({
        //   groupView: true,
        // });
        return this.props.rerender(err);
      }
      else {
        this.reloadGroupData();
      }
    })
  }
  reloadGroupData(){
    let myurl = `${process.env.REACT_APP_API_URL}group/${this.groupId}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        // this.setState({
        //   groupData : data,
        // });
        return this.props.rerender(err);
      }
      else {
        if(data.error){
          return this.props.rerender("Something went wrong while loading that data");
        }
        this.setState({
          groupData : data,
        });
      }
    })
  }


  render() {
    if(this.groupId !== this.props.match.params.groupId){
      this.groupId = this.props.match.params.groupId;
      this.reloadGroupData();
    }
    if(!this.props.appModel.userModel.login){
      this.props.history.push('/SignUpIn');
      return(<div></div>);
    }

     return (
       <section className='Group row'>
          <div className='col-10 offset-1 mt-4'>
            {this.state.groupView?
              <div className='row'>
                {this.state.groupData.error?
                  <div className='col-12'>
                  </div>
                  :
                  <div className='col-12'>
                    <div className='row justify-content-center'>
                      <div className='col-12 justify-content-center' >
                        <h1 id='group-name' className='font-4 justify-content-center' onClick={this.showEditGroupName}>
                          {this.state.groupData.groupName}
                        </h1>
                      </div>
                      <input id='edit-group-name' ref={this.refEditGroupName} onBlur={this.hideEditGroupName} defaultValue={this.state.groupData.groupName} className={`col-12 d-none font-4 justify-content-center`}/>
                    </div>
                    <div className= 'row'>
                      <div className={`col-12 justify-content-center ` + (this.props.appModel.userModel.isPartOfGroup(this.state.groupData)?'':'d-none')}>
                        <div className='btn btn-danger font-3' onClick={this.leaveGroup} >
                          Leave Group
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-8 m-1 border bg-light' onMouseLeave={this.hideCreateGroceryList}>
                        <div className='row'>
                          <div className='col-12 text-primary justify-content-center font-3'>
                            Grocery Lists
                          </div>
                        </div>
                        {this.state.groupData.grocerylists.map((grocerylist)=>{
                          return <div className='row'>
                            <Link className='col-12 font-3' to={`/grocerylist/${grocerylist.id}`}>
                              {grocerylist.name}
                            </Link>
                          </div>
                        })}
                        <div id='toggle-create-grocery-list' className='row btn btn-primary font-2' onClick={this.showCreateGroceryList}>
                          Create List
                        </div>
                        <div id='create-grocery-list' className='row d-none'>
                          <input id='create-grocery-list-name' placeholder='List name' type='text' ref={this.refAddGroceryListName} className='col-10 font-3'/>
                          <div  className='col-2 btn btn-primary' onClick={this.createGroceryList}>
                            +
                          </div>
                        </div>
                      </div>
                      <div className='col-3 m-1 border bg-light' onMouseLeave={this.hideInviteMember}>
                        <div className='row'>
                          <div className='col-12 text-primary justify-content-center font-3'>
                            Members
                          </div>
                        </div>
                        {this.state.groupData.groupusers.map((groupuser)=>{
                          return <div className='row'>
                            <Link className='col-12 font-3' to={`/profile/${groupuser.user.id}`}>
                              {groupuser.user.name}
                            </Link>
                          </div>
                        })}
                        <div id='toggle-invite-member' className='row btn btn-primary font-2' onClick={this.showInviteMember}>
                          Invite Member
                        </div>
                        <div id='invite-member' className='row d-none' >
                          <input id='invite-member-username' placeholder='username' type='text' ref={this.refAddMemberUsername} className='col-10 font-3'/>
                          <div  className='col-2 btn btn-primary' onClick={this.addMemberToGroup}>
                            +
                          </div>
                        </div>
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
                      <div className='col-8 offset-2 justify-content-center font-4'> Your Groups </div>
                    </div>
                    <div id='toggle-create-group' className='row btn btn-primary font-3' onClick={this.showCreateGroup}>
                      Create Group
                    </div>
                    <div id='create-group' className='row d-none' >
                      <div className='offset-md-2 col-2 '>
                        <div  className='btn btn-danger'  onClick={this.hideCreateGroup}>
                          X
                        </div>
                      </div>
                      <input id='create-group-name' placeholder='Group Name' type='text' ref={this.refCreateGroupName} className=' col-8 col-md-4 font-3'/>
                      <div className='col-2'>
                        <div  className='btn btn-primary'  onClick={this.createGroup}>
                          +
                        </div>
                      </div>
                    </div>
                    <div className='row mt-3'>
                      {this.props.appModel.userModel.userData.groupusers.map((groupuser,index)=>{
                        return <Link key={`groupuser-ender-${index}`} className='col-6 justify-content-center bg-light font-3 btn border' to={`/group/${groupuser.group.id}`}>
                          {groupuser.group.groupName}
                        </Link>
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
