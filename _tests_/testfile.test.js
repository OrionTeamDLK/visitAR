/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import Testfile from '../src/screensTests/testfile';


// Note: this is just for use with Jest snapshot testing
// and comes packaged with react-native init project.
// You do not need this if using Enzyme 'toMatchSnapshot' etc.
import renderer from 'react-test-renderer';

describe('Test is under this desribe tab.', () => {

  // This test just uses Jest snapshot testing
  it('renders correctly, test using Jest', () => {
    const component = shallow(<Testfile/>);
    console.log(component.debug());
    const wrapper = component.find('.Hello');
    expect(wrapper.length).toBe(1);
  });


});
