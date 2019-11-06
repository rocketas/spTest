import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import { setCardAnimation } from './LoginPage';
import { shallow } from 'enzyme';

describe('LoginPage', () => {
  it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginPage />, div);
  });
});
