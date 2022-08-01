import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import { useAuth0 } from "@auth0/auth0-react";
import { createMock } from 'ts-jest-mock';
import ProfileWithAuth0 from "../../components/ProfileWithAuth0";


const user = {
    email: 'johndoe@me.com',
    email_verified: true,
    sub: 'google-oauth2|2147627834623744883746',
  };


jest.mock('@auth0/auth0-react');
  const mockedUseAuth0 = createMock(useAuth0);

describe('LoginWithOAuth',() => {

    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: true,
            user,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            getAccessTokenWithPopup: jest.fn(),
            getAccessTokenSilently: jest.fn(),
            getIdTokenClaims: jest.fn(),
            loginWithPopup: jest.fn(),
            isLoading: false
        });
    });

    test('test Instance', () => {
        const wrapper = shallow(<ProfileWithAuth0 />);
        expect(wrapper.exists()).toBe(true);
    });
});