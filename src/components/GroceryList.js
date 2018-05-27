
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Messege from './Messege';
import GroceryListItem from './GroceryListItem';

class GroceryList extends Component {


  constructor(props){
    super(props);
    this.base = process.env.REACT_APP_API_URL;
    this.state=({
      loading: true,
      messege: "dummy"
    })
    this.groceryListId;
    this.initialize();
  }
  initialize(){

  }


  componentDidMount() {

    if(this.props.match.params.groceryListId){
      this.groceryListId = this.props.match.params.groceryListId;
      this.updateList();
    }
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

  checkBox = (e) =>{
    let ids = e.target.id.split('%');
    if(!e.target.checked){    //checked
      if(ids[1] && ids[1] == this.props.appModel.userModel.id){
        let myurl = `${process.env.REACT_APP_API_URL}groceryListItem/update/${ids[0]}`;
        let bodyFormData = new Object();
        bodyFormData.purchased=false;
        bodyFormData.needJSONbreakup = "J$0nBr4k3";
        this.fetchData(myurl,bodyFormData, (err,data)=>{
          if(err){
            this.setState({
              messege: err,
            });
          }
          else {
            this.updateList();
          }
        })
      }
      else {
        this.setState({
          messege : "That has already been purchased"
        });
      }
    }
    else {
      let myurl = `${process.env.REACT_APP_API_URL}groceryListItem/update/${ids[0]}`;
      let bodyFormData = new Object();
      bodyFormData.purchased=true;
      bodyFormData.userId = this.props.appModel.userModel.id;
      bodyFormData.needJSONbreakup = "J$0nBr4k3";
      this.fetchData(myurl,bodyFormData, (err,data)=>{
        if(err){
          this.setState({
            messege: err,
          });
        }
        else {
          this.updateList();
        }
      })
    }
  }
  updateList(){
    let myurl = `${process.env.REACT_APP_API_URL}groceryList/${this.groceryListId}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        this.setState({
          messege: err,
          groceryListData: data,
          loading: false,
        });
      }
      else {
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
      return a.priority - b.priority;
    });
  }

  render() {
    if(!this.props.appModel.userModel.login){
      this.props.history.push('/SignUpIn');
      return(<div></div>);
    }
    if(this.state.loading){
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
              <div className='row'>
                {this.state.groceryListData.error?
                  <div className='col-12'>
                    {this.state.groceryListData.error}
                  </div>
                  :
                  <div className='col-12'>
                    <h1 className='row justify-content-center'>
                      {this.state.groceryListData.name}
                    </h1>
                    <div className='row'>
                      <div className='col-12 m-1 border bg-light'>
                        <div className='row border border-primary'>
                            <div className='col-1'>
                            </div>
                            <div className='col-4'> Item
                            </div>
                            <div className='col-1'> Budget
                            </div>
                            <div className='col-2'> Priority
                            </div>
                            <div className='col-4'> Buyer
                            </div>
                        </div>
                        {this.state.groceryListData.groceries.map((grocery,index)=>{
                          return <GroceryListItem key={`grocerylistitem-${index}`}
                            item={grocery}
                            checkBox ={this.checkBox}
                            appModel = {this.props.appModel}
                          />
                        })}
                      </div>

                    </div>

                  </div>
                }
              </div>
          </div>
       </section>
      );
  }
}

export default GroceryList;
