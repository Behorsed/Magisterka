import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import TestSimple from "../TestSimple.js"
import Circle from "../circle.js"
import renderer from 'react-test-renderer';
import {render, fireEvent, cleanup} from 'react-testing-library';
afterEach(cleanup);
jest.mock('../Circle');
beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    SoundPlayer.mockClear();
});

it('Circle disappears after clicked', () => {
    expect(Circle.state.src).toBe(4);


});