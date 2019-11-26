/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtt } from '../../Utils/test_utils';
import GoogleMapsScreen from '../../src/screens/GoogleMapsScreen';
import renderer from 'react-test-renderer';


// setup for shallow rendering component, saves having to do it in every test in this file
const  setup = (props = {}) =>
{
  const component = shallow(<GoogleMapsScreen {...props} />);
  return component;
};


describe('Renders the following components correctly: ', () =>
{

    let component;
    beforeEach(() =>
    {
        component = setup();
    });

    it('View test.', () =>
    {
        console.log(component.debug());
        const wrapper = findByTestAtt(component, 'GoogleMapsScreen_view');
        expect(wrapper.length).toBe(1);

    });

    it('Map view test.', () =>
    {
        console.log(component.debug());
        const wrapper = findByTestAtt(component, 'GoogleMapsScreen_map_view');
        expect(wrapper.length).toBe(1);

    });

    it('Text button.', () =>
    {
        console.log(component.debug());
        const wrapper = findByTestAtt(component, 'GoogleMapsScreen_button');
        expect(wrapper.length).toBe(1);

    });

});
