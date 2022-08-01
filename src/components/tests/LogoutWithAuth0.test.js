import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import LogoutWithAuth0 from "../../components/LogoutWithAuth0";

describe('LoginWithOAuth',() => {

    test('test Instance', () => {
        const wrapper = shallow(<LogoutWithAuth0 />);
        expect(wrapper.exists()).toBe(true);
    });
});