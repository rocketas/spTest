
import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card.js';

describe('Card', () => {
 it('should be defined', () => {
   expect(Card).toBeDefined();
 });
 it('should render correctly', () => {
   const tree = shallow(
     <Card name='card test' />
   );
   expect(tree).toMatchSnapshot();
 });
});