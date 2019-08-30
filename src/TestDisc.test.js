import { configure, shallow, mount, render, unmount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import TestDisc from "./TestDisc"
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

configure({ adapter: new Adapter() });


    it('Discrimination Reaction Time Test renders without crashing', () => {
        shallow(<TestDisc />);
    });

    it('Clicking Reset in Discrimination Reaction Time Test makes the circle disappear and erases the results list', () => {
        const mockFunction = jest.fn();
        const component = mount(
            <TestDisc onMenuClick={() => {mockFunction()}}/>
        );
        component
            .find('button.reset')
            .simulate('click');
        expect(component.state('source')).toEqual('');
        expect(component.state('timeListDisc')).toEqual([]);
        component.unmount();
    });

    it('Clicking on a pink circle adds one record to timeList, and clicking on a blue one doesn\'t', () => {
        const mockFunction = jest.fn();
        const component = mount(
            <TestDisc onMenuClick={() => {
                mockFunction()
            }}/>
        );
        component.state().source = "/circleblue.jpg"
        component
            .find('.the-circle')
            .simulate('click');
        expect(component.state('source')).toEqual('');
        expect(component.state('timeListDisc')).toHaveLength(0);

        component.state().source = "/circle.jpg";
            component
                .find('.the-circle')
                .simulate('click');
                expect(component.state('source')).toEqual('');
                expect(component.state('timeListDisc')).toHaveLength(1);

        component.unmount();
    });
