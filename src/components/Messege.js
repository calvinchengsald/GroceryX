
import React, { Component } from 'react';
import $ from "jquery";

class Messege extends Component {

  handleClose = () => {
    $('#messege').slideUp();
    this.props.rerender("-");
  }

  componentDidMount(){
    $('#messege').slideUp(0);
  }
  componentDidUpdate(){
    if(this.props.messege === "-"){
      $('#messege').slideUp(0);
    }
    else {
      $('#messege').slideDown();
    }
  }

  render() {
   return (
     <section id='messege' className='row '>
        <div className='col-10 offset-1 bg-info'>
          <div className='row'>
            <div className='btn btn-primary col-2 offset-10' onClick={this.handleClose}>
             X
            </div>
            <div className='col-10 offset-1'>
              {this.props.messege}
            </div>

          </div>
        </div>

     </section>
    );
  }
}

export default Messege;
