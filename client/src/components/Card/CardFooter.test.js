
import React from 'react';
import { shallow } from 'enzyme';
import CardFooter from './CardFooter.js';

describe('CardFooter', () => {
 it('should be defined', () => {
   expect(CardFooter).toBeDefined();
 });
 it('should render correctly', () => {
   const tree = shallow(
     <CardFooter name='cardfooter test' />
   );
   expect(tree).toMatchSnapshot();
 });
});