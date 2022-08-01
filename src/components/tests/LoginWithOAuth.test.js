import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import LoginWithOAuth from "../../components/LoginWithOAuth";

describe('LoginWithOAuth',() => {

    test('test Instance', () => {
        const wrapper = shallow(<LoginWithOAuth />);
        const instance = wrapper.instance();
        expect(wrapper.exists()).toBe(true);
    });
});