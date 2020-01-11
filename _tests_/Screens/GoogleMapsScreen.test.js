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


describe('The following components should pass, as latitude cannot be gotten: ', () =>
{

    let component;
    beforeEach(() =>
    {
        component = setup();
    });

    it('Main View Element.', () =>
    {
        const wrapper = findByTestAtt(component, 'GoogleMapsScreen_view');
        expect(wrapper.length).toBe(0);

    });

    it('Map view Element.', () =>
    {
        const wrapper = findByTestAtt(component, 'MapView');
        expect(wrapper.length).toBe(0);

    });

    it('Button view Element.', () =>
    {
        const wrapper = findByTestAtt(component, 'ButtonView');
        expect(wrapper.length).toBe(0);

    });

    it('Nav Screen button.', () =>
    {
        const wrapper = findByTestAtt(component, 'Screen_Nav_Button');
        expect(wrapper.length).toBe(0);

    });

    it('Recentre button.', () =>
    {
        const wrapper = findByTestAtt(component, 'Screen_Recenter_Button');
        expect(wrapper.length).toBe(0);

    });

});

describe('The following components should pass, displays the loading bar: ', () =>
{

    let component;
    beforeEach(() =>
    {
        component = setup();
    });

    it('Alternate View.', () =>
    {
        const wrapper = findByTestAtt(component, 'Alt_View');
        expect(wrapper.length).toBe(1);

    });

    it('Loading Bar.', () =>
    {
        const wrapper = findByTestAtt(component, 'Loading_Bar');
        expect(wrapper.length).toBe(1);

    });

});
