
import '@testing-library/jest-dom';
import Enzyme,{ shallow, mount } from 'enzyme';
import LoginWithAuth0 from "../../components/LoginWithAuth0";
import React, { useState as useStateMock } from 'react';

describe('LoginWithAuth0', () => {
    
    test('test Instance', () => {
        const wrapper = shallow(<LoginWithAuth0  />);
        expect(wrapper.exists()).toBeTruthy();
    });
});