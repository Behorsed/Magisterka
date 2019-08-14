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