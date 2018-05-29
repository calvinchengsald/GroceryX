
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Messege from './Messege';
import GroceryListItem from './GroceryListItem';
import $ from 'jquery';

class GroceryList extends Component {


  constructor(props){
    super(props);
    this.base = process.env.REACT_APP_API_URL;
    this.state=({
      loading: true,
    })
    this.groceryListId;
    this.initialize();
  }
  initialize(){
    this.refEditGroceryListName = React.createRef();
  }


  componentDidMount() {

    if(this.props.match.params.groceryListId){
      this.groceryListId = this.props.match.params.groceryListId;
      this.updateList();
    }
    this.listenId = setInterval(()=>{this.updateList()},1000);
    return this.props.rerender("");
  }
  componentWillUnmount(){
    clearInterval(this.listenId);
  }
  componentDidUpdate(){
    // if(this.props.match.params.groceryListId && this.props.match.params.groceryListId !== this.groceryListId){
    //   this.groceryListId = this.props.match.params.groceryListId;
    //   this.setState({
    //     groceryList
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

  deleteItem = (e) =>{
    let ids = e.target.id.split('%');
    let id = ids[0];
    if(!id){
      return this.props.rerender("Something went wrong");
    }
    else if (this.props.appModel.userModel.isPartOfGroceryList(this.state.groceryListData)){
      //delete the Item
      let myurl = `${process.env.REACT_APP_API_URL}groceryListItem/delete/${id}`;
      let bodyFormData = new Object();
      bodyFormData.needJSONbreakup = "J$0nBr4k3";
      this.fetchData(myurl,bodyFormData, (err,data)=>{
        if(err){
          return this.props.rerender(err);
        }
        else {
          if(data.error){
            return this.props.rerender(data.error);
          }
          this.updateList();
        }
      })
    }
    else {

      return this.props.rerender("You are not authorized for this action");
    }
  }
  findGroceryItemData(id){
    return this.state.groceryListData.groceries.find((grocery)=>{
      return grocery.id===id;
    })
  }
  checkBox(id){

    if (!this.props.appModel.userModel.isPartOfGroceryList(this.state.groceryListData)){
      return this.props.rerender("You do not belong to this group");
    }
    let thisData = this.findGroceryItemData(id);
    if(thisData.purchased){    //checked
      if(thisData.userId && thisData.userId == this.props.appModel.userModel.id){
        let myurl = `${process.env.REACT_APP_API_URL}groceryListItem/update/${id}`;
        let bodyFormData = new Object();
        bodyFormData.purchased=false;
        bodyFormData.needJSONbreakup = "J$0nBr4k3";
        this.fetchData(myurl,bodyFormData, (err,data)=>{
          if(err){
            return this.props.rerender(err);
          }
          else {
            if(data.error){
              return this.props.rerender(data.error);
            }
            this.updateList();
          }
        })
      }
      else {
        return this.props.rerender("That has already been purchased");
      }
    }
    else {
      let myurl = `${process.env.REACT_APP_API_URL}groceryListItem/update/${id}`;
      let bodyFormData = new Object();
      bodyFormData.purchased=true;
      bodyFormData.userId = this.props.appModel.userModel.id;
      bodyFormData.needJSONbreakup = "J$0nBr4k3";
      this.fetchData(myurl,bodyFormData, (err,data)=>{
        if(err){
          return this.props.rerender(err);
        }
        else {
          if(data.error){
            return this.props.rerender(data.error);
          }
          this.updateList();
        }
      })
    }
  }
  setMessege(msg){
    return this.props.rerender(msg);
  }
  updateList(){
    let myurl = `${process.env.REACT_APP_API_URL}groceryList/${this.groceryListId}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        return this.props.rerender(err);
      }
      else {
        if(data.error){
          return this.props.rerender(data.error);
        }
        this.orderGroceryListData(data);
        this.setState({
          groceryListData : data,
          loading: false,
        });

      }
    })
  }
  orderGroceryListData(data){
    data.groceries.sort( (a, b) => {
      if( a.priority === b.priority){
        return a.name > b.name ? 1 : -1
      }
      return b.priority - a.priority;
    });
  }
  deleteGroceryListWarning = (e) =>{
    var confirm = window.confirm("Are you sure you want to delete this list? This cannot be undone");
    if(confirm){
      if(this.state.groceryListData.ownerId === this.props.appModel.userModel.id){
        let myurl = `${process.env.REACT_APP_API_URL}groceryList/delete/${this.state.groceryListData.id}`;
        let bodyFormData = new Object();
        bodyFormData.needJSONbreakup = "J$0nBr4k3";
        this.fetchData(myurl,bodyFormData, (err,data)=>{
          if(err){
            return this.props.rerender(err);
          }
          else {
            if(data.error){
              return this.props.rerender(data.error);
            }

            this.props.history.push('/Group');
            return this.props.appModel.userModel.updateUserData(()=>{
              this.props.rerender("Successfully deleted List");
            });
          }
        })
      }
      else {
        return this.props.rerender("You are not authorized to do that");
      }
    }
  }
  togglePrivate = (e) =>{
    let myurl = `${process.env.REACT_APP_API_URL}groceryList/update/${this.state.groceryListData.id}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    bodyFormData.private = !this.state.groceryListData.private;
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        return this.props.rerender(err);
      }
      else {
        if(data.error){
          return this.props.rerender(data.error);
        }
        this.updateList();
      }
    })
  }


  showAddItem = (e) =>{
    if (!this.props.appModel.userModel.isPartOfGroceryList(this.state.groceryListData)){
      return this.props.rerender("You do not belong to this group");
    }
    $('#add-item-btn-show').addClass('d-none');
    $('#add-item-btn-action').removeClass('d-none');
    $('#priority-select').removeClass('d-none');
    $('#budget-select').removeClass('d-none');
    $('#name-select').removeClass('d-none');
    $('#hide-add-item-btn').removeClass('d-none');
    $('#name-select').focus();
  }
  hideAddItem() {
    $('#add-item-btn-show').removeClass('d-none');
    $('#add-item-btn-action').addClass('d-none');
    $('#priority-select').addClass('d-none');
    $('#budget-select').addClass('d-none');
    $('#name-select').addClass('d-none');
    $('#hide-add-item-btn').addClass('d-none');
  }
  showEditGroceryListName = (e) =>{
    if (!this.props.appModel.userModel.isPartOfGroceryList(this.state.groceryListData)){
      return this.props.rerender("You do not belong to this group");
    }
    $('#grocery-list-name').addClass('d-none');
    $('#edit-grocery-list-name').removeClass('d-none').focus();
  }
  hideEditGroceryListName = (e) =>{
    $('#grocery-list-name').removeClass('d-none');
    $('#edit-grocery-list-name').addClass('d-none');
    this.editGroceryListName();
  }
  editGroceryListName(){
    if(!this.props.appModel.userModel.isPartOfGroceryList(this.state.groceryListData)){

      return this.props.rerender("You are not authorized to do that");
    }
    let editGroceryListName = this.refEditGroceryListName.current.value;

    if(this.state.groceryListData.name === editGroceryListName){
      return;
    }
    if(!editGroceryListName){
      return this.props.rerender("Please enter a valid list name");
    }
    let myurl = `${process.env.REACT_APP_API_URL}groceryList/update/${this.state.groceryListData.id}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    bodyFormData.name = editGroceryListName;
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        return this.props.rerender(err);
      }
      else {
        if(data.error){
          return this.props.rerender(data.error);
        }
        this.updateList();
      }
    })
  }
  addItem = () =>{
    let itemName = $('#name-select').val();
    let itemBudget = $('#budget-select').val();
    let itemPriority = $('#priority-select').val();
    if(!itemName){
      return this.props.rerender("You must include an Item Name");
    }
    let myurl = `${process.env.REACT_APP_API_URL}groceryListItem/create`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    bodyFormData.name = itemName;
    bodyFormData.priority = itemPriority;
    bodyFormData.userId = this.props.appModel.userModel.userData.id;
    bodyFormData.groceryListId = this.state.groceryListData.id;
    bodyFormData.purchased = false;
    if(itemBudget){
      bodyFormData.budget = itemBudget;
    }
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        return this.props.rerender(err);
      }
      else {
        if(data.error){
          return this.props.rerender(data.error);
        }
        this.updateList();
        this.hideAddItem();
      }
    })
  }
  editItem(id,callback){
    let itemName = $('#name-select-edit').val();
    let itemBudget = $('#budget-select-edit').val();
    let itemPriority = $('#priority-select-edit').val();
    if(!itemName){
      this.props.rerender("You must include an Item Name");
      return callback(false);
    }
    let myurl = `${process.env.REACT_APP_API_URL}groceryListItem/update/${id}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    bodyFormData.name = itemName;
    bodyFormData.priority = itemPriority;
    bodyFormData.purchased =!this.findGroceryItemData(id).purchased;
    if(itemBudget){
      bodyFormData.budget = itemBudget;
    }
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        this.props.rerender(err);
        return callback(false);
      }
      else {
        if(data.error){
          this.props.rerender(data.error);
          return callback(false);
        }
        this.updateList();
        return callback(true);
      }
    })
  }


  render() {
    if(!this.props.appModel.userModel.login){
      this.props.history.push('/SignUpIn');
      return(<div></div>);
    }
    if(this.groceryListId !== this.props.match.params.groceryListId){
      this.groceryListId = this.props.match.params.groceryListId;
      this.updateList();
    }
    if(this.state.loading){
      return(<div></div>);
    }
     return (
       <section className='Group row'>
          <div className='col-10 offset-1 mt-4'>
            {(this.state.groceryListData.private && this.state.groceryListData.ownerId !== this.props.appModel.userModel.userData.id)?
              <div className='row font-4'>
                Sorry, This is a private list :(
              </div>
              :
              <div className='row'>
                {this.state.groceryListData.error?
                  <div className='col-12'>
                    {this.state.groceryListData.error}
                  </div>
                  :
                  <div className='col-12'>

                    <div className='row justify-content-center'>
                      <h1 id='grocery-list-name' className='col-12 font-4' onClick={this.showEditGroceryListName}>
                        {this.state.groceryListData.name}
                      </h1>
                      <input id='edit-grocery-list-name' ref={this.refEditGroceryListName} onBlur={this.hideEditGroceryListName} defaultValue={this.state.groceryListData.name} className={`col-12 d-none font-4`}/>

                    </div>
                    <div className='row justify-content-center'>
                        <div className={`btn btn-danger m-0 font-3` + (this.props.appModel.userModel.userData.id === this.state.groceryListData.ownerId?'':'d-none')} onClick={this.deleteGroceryListWarning}>
                          Delete
                        </div>
                      <div className=' col-4 font-3' >
                        By {this.state.groceryListData.owner.name}
                      </div>
                      <div className={`btn btn-secondary m-0 font-3` + (this.props.appModel.userModel.userData.id === this.state.groceryListData.ownerId?'':'d-none')} onClick={this.togglePrivate} >
                        {this.state.groceryListData.private?"Set Public":"Set Private"}
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12 m-1 border bg-light'>
                        <div className='row border border-primary'>
                            <div className='col-1'>
                            </div>
                            <div className='col-3 font-sm-2'> Item
                            </div>
                            <div className='col-3 font-sm-2'> Buyer
                            </div>
                            <div className='col-1 font-sm-2'> Budget
                            </div>
                            <div className='col-1 font-sm-2'> Priority
                            </div>
                            <div className='col-1 font-sm-2'> Delete
                            </div>
                        </div>
                        {this.state.groceryListData.groceries.map((grocery,index)=>{
                          return <GroceryListItem key={`grocerylistitem-${index}`}
                            item={grocery}
                            checkBox ={(id)=>this.checkBox(id)}
                            appModel = {this.props.appModel}
                            setMessege = {(msg)=>this.setMessege(msg)}
                            deleteItem = {this.deleteItem}
                            editItem = {(index, callback)=>this.editItem(index, callback)}
                            groceryListData = {this.state.groceryListData}
                            rerender = {(str)=>this.props.rerender(str)}
                          />
                        })}
                        <div className='row'>
                          <div className='col-1'>
                            <div id='hide-add-item-btn' className='btn btn-danger d-none font-sm-2' onClick={()=>this.hideAddItem()}>
                              X
                            </div>
                          </div>
                          <div className='col-3'>
                            <input type='text'  id='name-select' placeholder='Item Name' className='d-none font-sm-2' />
                          </div>
                          <div className='col-3'>

                          </div>
                          <div className='col-1'>
                            <input type='number' min='1' max='10000' id='budget-select' placeholder='NA' className='d-none font-sm-2' />
                          </div>
                          <div className='col-1'>
                            <select id='priority-select' className='d-none font-sm-2' defaultValue="0">
                              <option value="0" >None</option>
                              <option value="1" >1</option>
                              <option value="2" >2</option>
                              <option value="3" >3</option>
                              <option value="4" >4</option>
                              <option value="5" >5</option>
                              <option value="6" >6</option>
                              <option value="7" >7</option>
                              <option value="8" >8</option>
                              <option value="9" >9</option>
                              <option value="10" >10</option>
                            </select>
                          </div>
                          <div id='add-item-btn-show' className='col-2' onClick={this.showAddItem}>
                            <div className='btn btn-primary font-sm-2'>
                              +
                            </div>
                          </div>
                          <div id="add-item-btn-action" className='col-2 d-none' onClick={this.addItem}>
                            <div className='btn btn-primary font-sm-2'>
                              Add Item
                            </div>
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

export default GroceryList;
