
import React, { Component } from 'react';
import $ from "jquery";

class Messege extends Component {
  constructor(props){
    super(props);
    this.prevMessege = this.props.messege;
  }

  handleClose = () => {
    $('#messege').slideUp();
    this.prevMessege = "";
  }

  componentDidMount(){
    $('#messege').slideUp(0);
  }
  componentDidUpdate(){
    if(this.prevMessege !== this.props.messege){
      this.prevMessege = this.props.messege;
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
