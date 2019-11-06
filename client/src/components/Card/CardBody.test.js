
import React from 'react';
import { shallow } from 'enzyme';
import CardBody from './CardBody.js';

describe('CardBody', () => {
 it('should be defined', () => {
   expect(CardBody).toBeDefined();
 });
 it('should render correctly', () => {
   const tree = shallow(
     <CardBody name='card body test' />
   );
   expect(tree).toMatchSnapshot();
 });
});