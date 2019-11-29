/**
* @format
*/

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtt } from '../../Utils/test_utils';
import HelpInfo from '../../src/Components/HelpInfo';


// Note: this is just for use with Jest snapshot testing
// and comes packaged with react-native init project.
// You do not need this if using Enzyme 'toMatchSnapshot' etc.
import renderer from 'react-test-renderer';

// setup for shallow rendering component, saves having to do it in every test in this file
const  setup = (props = {}) =>
{
 const component = shallow(<HelpInfo {...props} />);
 return component;
};


describe('HelpInfo tests: ', () => {

let component;
beforeEach(() => {
 component = setup();
});


it('View renders correctly: ', () => {
  console.log(component.debug());
  const wrapper = findByTestAtt(component, 'helpinfo_view');
  expect(wrapper.length).toBe(1);
});

 it('Text renders correctly: ', () => {
   console.log(component.debug());
   const wrapper = findByTestAtt(component, 'helpinfo_text');
   expect(wrapper.length).toBe(1);
 });


});
