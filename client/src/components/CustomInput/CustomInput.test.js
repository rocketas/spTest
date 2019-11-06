
import React from 'react';
import { shallow } from 'enzyme';
import CustomInput from './CustomInput.js';

describe('CustomInput', () => {
 it('should be defined', () => {
   expect(CustomInput).toBeDefined();
 });
 it('should render correctly', () => {
   const tree = shallow(
     <CustomInput name='custominput test' />
   );
   expect(tree).toMatchSnapshot();
 });
});
