import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import TestSimple from "../TestSimple.js"
import Circle from "../circle.js"
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, cleanup } from '@testing-library/react'
afterEach(cleanup);
test('The circle disappears after being clicked', () => {
    //arrange
    const src = '../circle.jpg';
    const {getByTestId} = render(
        <TestSimple/>,
    )
    fireEvent.click(getByTestId('circle'))//clicks on IMG in DOM
    //assert
    expect(getByTestId('circle')).toMatchInlineSnapshot(`
 <div class = "circlediv">
                <img class="the-circle" data-testid ='circle' alt = '' src=""  onClick={() => this.props.onCircleClick()}/>
            </div>
`)
})