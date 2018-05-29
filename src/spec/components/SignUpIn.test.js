import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import SignUpIn from '../../components/SignUpIn';
import { BrowserRouter } from 'react-router-dom';


describe("SingUpIn functions", ()=>{
  beforeEach(()=>{
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
      <App />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("Should sing in with valid account", ()=>{

  })
});
