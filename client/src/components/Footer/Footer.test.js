
import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer.js';

describe('Footer', () => {
 it('should be defined', () => {
   expect(Footer).toBeDefined();
 });
 it('should render correctly', () => {
   const tree = shallow(
     <Footer name='footer test' />
   );
   expect(tree).toMatchSnapshot();
 });
});
