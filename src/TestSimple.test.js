import { configure, shallow, mount, render, unmount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import TestSimple from "./TestSimple"
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import TestDisc from "./TestDisc";

configure({ adapter: new Adapter() });

    it('Simple Reaction Time Test renders without crashing', () => {
        shallow(<TestSimple />);
    });


    it('Clicking Reset in Simple Reaction Time Test makes the circle disappear and erases the results list', () => {
        const mockFunction = jest.fn();
        const component = mount(
            <TestSimple onMenuClick={() => {mockFunction()}}/>
        );
        component
            .find('button.reset')
            .simulate('click');
        expect(component.state('source')).toEqual('');
        expect(component.state('timeListSimple')).toEqual([]);
        component.unmount();
    });

it('Clicking in pink circle makes it disappear and adds one record to timeList ', () => {
    const mockFunction = jest.fn();
    const component = mount(
        <TestSimple onMenuClick={() => {mockFunction()}}/>
    )
    expect(component.state('timeListSimple')).toHaveLength(0);
    component
        .find('.the-circle')
        .simulate('click');
    expect(component.state('source')).toEqual('');
    expect(component.state('timeListSimple')).toHaveLength(1);
    component.unmount();
});