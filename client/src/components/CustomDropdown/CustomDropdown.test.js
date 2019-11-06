
import React from 'react';
import { shallow } from 'enzyme';
import CustomDropdown from './CustomDropdown.js';

describe('CustomDropdown', () => {
 it('should be defined', () => {
   expect(CustomDropdown).toBeDefined();
 });
 it('should render correctly', () => {
   const tree = shallow(
     <CustomDropdown name='customdropdown test' />
   );
   expect(tree).toMatchSnapshot();
 });
});
