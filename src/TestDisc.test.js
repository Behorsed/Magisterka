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
            .find('button#disc-reset')
            .simulate('click');
        expect(component.state('source')).toEqual('');
        expect(component.state('timeListSimple')).toEqual([]);
        component.unmount();
    });

