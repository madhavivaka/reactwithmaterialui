import '@testing-library/jest-dom';
import Enzyme,{ shallow, mount } from 'enzyme';
import DashBoardLoader from "../../components/DashBoardLoader";
import React, { useState as useStateMock } from 'react';

describe('DashBoardLoader', () => {
    
    test('test Instance', () => {
        const wrapper = shallow(<DashBoardLoader  />);
        expect(wrapper.exists()).toBeTruthy();
    });
});