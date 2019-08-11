import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App"
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, cleanup } from '@testing-library/react'
configure({ adapter: new Adapter() });
afterEach(cleanup);
test('AppMatchesSnapshot', () => {
    //arrange
    const { wrapper } = render(
        <App />
    );
    //assert
    expect(wrapper).toMatchSnapshot();
})