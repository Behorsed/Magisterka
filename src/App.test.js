import { configure, shallow, mount, render, unmount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App"
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
configure({ adapter: new Adapter() });

describe('Components render without crashing', () => {
    it('renders without crashing', () => {
        shallow(<App />);
    });
});
describe('Clicking buttons in Title Screen', () => {
    it('Clicking SRT Test Button opens Simple Reaction Time test', () => {
        //arrange
        const component = mount(
            <App />
        );
        //act
        component
            .find('button.btnsimple')
            .simulate('click');
        //assert
        expect(component
            .exists('#test-simple')).toEqual(true);
    });
    it('Clicking DRT Test Button opens Discrimination Reaction Time test', () => {
        //arrange
        const component = mount(
            <App />
        );
        //act
        component
            .find('button.btndisc')
            .simulate('click');
        //assert
        expect(component
            .exists('#test-disc')).toEqual(true);
    });
});
