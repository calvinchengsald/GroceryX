
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Landing extends Component {
  constructor(props){

    super(props);
    let hash = this.props.location.hash.replace('#!','');
    if(hash.length!==0){
      this.props.history.replace(hash);
    }
  }
  render() {
   return (
     <section className='row'>
       <h1 className='col-12'>
        Welcome to GroceryX
       </h1>
       <h2 className='col-6 offset-3'>
        Share your grocery list now!
       </h2>
       {this.props.appModel.userModel.login?
         <div>

         </div>
         :
         <div className ='col-6 offset-3'>
          <Link className='font-3 btn btn-primary' to={'/SignUpIn'}> Sign In </Link>
         </div>
       }
     </section>
    );
  }
}

export default Landing;
