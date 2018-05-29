
import React, { Component } from 'react';
import $ from 'jquery';

class GroceryListItem extends Component {

  constructor(props){
    super(props);
    this.state={
      editMode: false
    };
  }
  setEdit = () =>{
    if (!this.props.appModel.userModel.isPartOfGroceryList(this.props.groceryListData)){
      return this.props.rerender("You do not belong to this group");
    }
    this.setState(
      {editMode:true},
      ()=> {$('#name-select-edit').focus(); }
    );

  }
  hideEdit = () =>{
    this.setState(
      {editMode:false
    });

  }
  editItem(){
    this.props.editItem(this.props.item.id,(success)=>{
      if(success){
        this.setState({
          editMode:false
        });
      }
    });
  }


  render() {
    if(!this.state.editMode){
      return (
        <section className='groceryListItem row border border-primary' id={`${this.props.item.id}%${this.props.item.userId}`} onClick={()=>this.props.checkBox(this.props.item.id)}>
           <input id='item-bought' className='col-1'  type='checkbox' checked={this.props.item.purchased}/>
           <div className='font-sm-2 col-3'>
             {this.props.item.name}
           </div>
           {this.props.item.purchased?
             <div className='font-sm-2 col-3'>
               {this.props.item.buyer.name}
             </div>
             :
             <div className='font-sm-2 col-3'>
             </div>
           }
           {this.props.item.budget?
             <div className='font-sm-2 col-1'>
               {this.props.item.budget}
             </div>
             :
             <div className='font-sm-2 col-1'>
             </div>
           }

           {this.props.item.priority?
             <div className='font-sm-2 col-1'>
               {this.props.item.priority}
             </div>
             :
             <div className='font-sm-2 col-1'>
             </div>
           }

           <div className='font-sm-2 col-1'>
             <div id={`${this.props.item.id}%delete-btn`} className='font-sm-2 btn btn-danger' onClick={this.props.deleteItem}> - </div>
           </div>
           <div className='col-1'>
             <div id={`${this.props.item.id}%edit-btn`} className='font-sm-2 btn glyphicon glyphicon-edit' onClick={this.setEdit}>
             </div>
           </div>
        </section>
       );
    }
    else {
      return (
        <section className='groceryListItem row border border-primary'>
          <div className='col-1'>
            <div id='hide-edit-item-btn' className='btn btn-danger' onClick={()=>this.hideEdit()}>
              X
            </div>
          </div>
          <div className='col-3'>
            <input type='text'  id='name-select-edit' defaultValue={this.props.item.name} className='' />
          </div>
          <div className='col-3'>

          </div>
          <div className='col-1'>
            <input type='number' min='1' max='10000' id='budget-select-edit' placeholder='NA' defaultValue={this.props.item.budget || ""} className='' />
          </div>
          <div className='col-1'>
            <select id='priority-select-edit' className='' defaultValue={this.props.item.priority +"" || "0"}>
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
          <div id="add-item-btn-action" className='col-2' onClick={()=>this.editItem()}>
            <div className='btn btn-primary'>
              Confirm
            </div>
          </div>
        </section>
       );
    }

  }
}

export default GroceryListItem;
