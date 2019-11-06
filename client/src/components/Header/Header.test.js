
import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header.js';

describe('Header', () => {
 it('should be defined', () => {
   expect(Header).toBeDefined();
 });
 it('should render correctly', () => {
   const tree = shallow(
     <Header name='header test' />
   );
   expect(tree).toMatchSnapshot();
 });
});
