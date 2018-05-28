
import React, { Component } from 'react';

class GroceryListItem extends Component {




  render() {
   return (
     <section className='groceryListItem row border border-primary'>
        <input id={`${this.props.item.id}%${this.props.item.userId}`} type='checkbox' className='col-1' onClick={this.props.checkBox} checked={this.props.item.purchased}/>
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
        <div className='col-2 '>
          <div id={`${this.props.item.id}%delete-btn`} className='btn btn-danger' onClick={this.props.deleteItem}> - </div>
        </div>
     </section>
    );
  }
}

export default GroceryListItem;
