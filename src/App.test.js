import { configure, shallow, mount, render, unmount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App"
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

configure({ adapter: new Adapter() });


    it('App renders without crashing', () => {
        shallow(<App />);
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
            .exists('#test-simple')).toEqual(true); //test simple section appeared
        expect(component
            .exists('#title')).toEqual(false); //title section disappeared
        component.unmount();
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
            .exists('#test-disc')).toEqual(true); //test disc section appeared
        expect(component
            .exists('#title')).toEqual(false); //title section disappeared
        component.unmount();
    });
});
describe('Clicking Menu buttons in Reaction Tests', () => {
    it('Clicking Menu button in Test Disc opens title screen', () => {
        const component = mount(
            <App />
        );
        //act
        component
            .find('button.btndisc')
            .simulate('click');
        component
            .find('button.menu')
            .simulate('click');
        expect(component
            .exists('#test-disc')).toEqual(false); //test disc section disappeared
        expect(component
            .exists('#title')).toEqual(true); //title section appeared
        component.unmount();
    });
    it('Clicking Menu button in Test Simple opens title screen', () => {
        const component = mount(
            <App />
        );
        //act
        component
            .find('button.btnsimple')
            .simulate('click');
        component
            .find('button.menu')
            .simulate('click');
        expect(component
            .exists('#test-simple')).toEqual(false); //test disc section disappeared
        expect(component
            .exists('#title')).toEqual(true); //title section appeared
        component.unmount();
    });
});