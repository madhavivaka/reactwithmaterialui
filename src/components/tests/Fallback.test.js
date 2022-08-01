import '@testing-library/jest-dom';
import Enzyme,{ shallow, mount } from 'enzyme';
import Fallback from "../../components/Fallback";
import React, { useState as useStateMock } from 'react';

describe('Fallback', () => {
    
    test('test Instance', () => {
        const wrapper = shallow(<Fallback  />);
        expect(wrapper.exists()).toBeTruthy();
    });
});