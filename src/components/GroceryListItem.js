
import React, { Component } from 'react';

class GroceryListItem extends Component {

  constructor(props){
    super(props);
    this.state={
      editMode: false
    };
  }
  setEdit = () =>{
    this.setState({
      editMode:true
    });
  }
  editItem(){
    console.log(this.props.item.id);
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
        <section className='groceryListItem row border border-primary'>
           <input className='col-1' id={`${this.props.item.id}%${this.props.item.userId}`} type='checkbox' onClick={this.props.checkBox} checked={this.props.item.purchased}/>
           <div className='col-4'>
             {this.props.item.name}
           </div>
           {this.props.item.budget?
             <div className='col-1'>
               {this.props.item.budget}
             </div>
             :
             <div className='col-1'>
             </div>
           }

           {this.props.item.priority?
             <div className='col-1'>
               {this.props.item.priority}
             </div>
             :
             <div className='col-1'>
             </div>
           }
           {this.props.item.purchased?
             <div className='col-3'>
               {this.props.item.buyer.name}
             </div>
             :
             <div className='col-3'>
             </div>
           }
           <div className='col-1 '>
             <div id={`${this.props.item.id}%delete-btn`} className='btn btn-danger' onClick={this.props.deleteItem}> - </div>
           </div>
           <div className='col-1 '>
             <div id={`${this.props.item.id}%edit-btn`} className='btn glyphicon glyphicon-edit' onClick={this.setEdit}>
             </div>
           </div>
        </section>
       );
    }
    else {
      return (
        <section className='groceryListItem row border border-primary'>
          <div className='col-1'>
            <div id='hide-edit-item-btn' className='btn btn-danger' onClick={()=>this.hideAddItem()}>
              X
            </div>
          </div>
          <div className='col-4'>
            <input type='text'  id='name-select-edit' defaultValue={this.props.item.name} className='' />
          </div>
          <div className='col-1'>
            <input type='number' min='1' max='10000' id='budget-select-edit' placeholder='NA' defaultValue={this.props.item.budget || ""} className='' />
          </div>
          <div className='col-1'>
            <select id='priority-select-edit' className='' value={this.props.item.priority +"" || "0"}>
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
          <div id="add-item-btn-action" className='col-2 offset-3' onClick={()=>this.editItem()}>
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
