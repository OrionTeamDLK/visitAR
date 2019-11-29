/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtt } from '../../Utils/test_utils';
import Testfile from './testfile';


// Note: this is just for use with Jest snapshot testing
// and comes packaged with react-native init project.
// You do not need this if using Enzyme 'toMatchSnapshot' etc.
import renderer from 'react-test-renderer';

// setup for shallow rendering component, saves having to do it in every test in this file
const  setup = (props = {}) => {
  const component = shallow(<Testfile {...props} />);
  return component;
};


describe('Test is under this desribe tab.', () => {

let component;
beforeEach(() => {
  component = setup();
});

  // This test just uses Jest snapshot testing
  it('renders correctly, test using Jest', () => {
    console.log(component.debug());
    const wrapper = findByTestAtt(component, 'Hello');
    expect(wrapper.length).toBe(1);
  });

  // This test just uses Jest snapshot testing
  it('renders correctly, test using Jest', () => {
    console.log(component.debug());
    const wrapper = findByTestAtt(component, 'Hello2');
    expect(wrapper.length).toBe(1);
  });
  
});
