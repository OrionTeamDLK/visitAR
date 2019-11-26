/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtt } from '../../Utils/test_utils';
import IndexScreen from '../../src/screens/IndexScreen';

import renderer from 'react-test-renderer';


// setup for shallow rendering component, saves having to do it in every test in this file
const  setup = (props = {}) =>
{
  const component = shallow(<IndexScreen {...props} />);
  return component;
};


describe('Renders the following components from IndexScreen correctly: ', () =>
{

    let component;
    beforeEach(() =>
    {
        component = setup();
    });

    it('Index view renders..', () =>
    {
        console.log(component.debug());
        const wrapper = findByTestAtt(component, 'index_view');
        expect(wrapper.length).toBe(1);

    });

    it('Index text renders...', () =>
    {
        console.log(component.debug());
        const wrapper = findByTestAtt(component, 'index_text');
        expect(wrapper.length).toBe(2);

    });

    it('Index nav button renders..', () =>
    {
        console.log(component.debug());
        const wrapper = findByTestAtt(component, 'index_nav_button');
        expect(wrapper.length).toBe(3);

    });


});
