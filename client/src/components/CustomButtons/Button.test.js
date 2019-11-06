
import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button.js';

describe('Button', () => {
 it('should be defined', () => {
   expect(Button).toBeDefined();
 });
 it('should render correctly', () => {
   const tree = shallow(
     <Button name='button test' />
   );
   expect(tree).toMatchSnapshot();
 });
 it('should call mock function when button is clicked', () => {
  const mockFn=jest.fn(); 
  const tree = shallow(
    <Button name='button test' onClick={mockFn} />
  );
  tree.simulate('click', {
    preventDefault: () => {
    }
   });
  expect(mockFn).toHaveBeenCalled();
});
});

