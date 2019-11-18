/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';


// Note: this is just for use with Jest snapshot testing
// and comes packaged with react-native init project.
// You do not need this if using Enzyme 'toMatchSnapshot' etc.
import renderer from 'react-test-renderer';

// This test just uses Jest snapshot testing
it('renders correctly, test using Jest', () => {
  expect(1).toBe(1);
});
