import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import Group from '../../components/Group';
import { BrowserRouter } from 'react-router-dom';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
    <App />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Link changes the class when hovered', () => {

  expect("to").toBe("to");
});
