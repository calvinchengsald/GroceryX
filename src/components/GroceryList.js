
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Messege from './Messege';

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
          this.setState({
            groceryListData : data,
            loading: false,
          });
        }
      })
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
                      <div className='col-8 m-1 border bg-light'>
                        {this.state.groceryListData.groceries.map((grocery)=>{
                          return <div className='row'>
                            <div className='col-12' >
                              {grocery.name}
                            </div>
                          </div>
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
