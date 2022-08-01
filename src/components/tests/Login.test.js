import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Login from "../../components/Login";

describe('login',() => {

    test('should call handleChange for password  when empty', async () => {
        const handleChangeSpy= jest.fn();
        const wrapper = shallow(<Login handleChange={handleChangeSpy}  />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'handleChange');
        wrapper.find('.input-password').simulate('change', {target: { value: '', name: 'password'}});
        expect(instance.state.errors.password).toBe('Password is required');
    });

    test('should call handleChange for password  when not empty', async () => {
        const handleChangeSpy= jest.fn();
        const wrapper = shallow(<Login handleChange={handleChangeSpy}  />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'handleChange');
        wrapper.find('.input-password').simulate('change', {target: { value: 'password', name: 'password'}});
        expect(instance.state.errors.password).toBe('');
    });

    test('should call handleChange for username  when empty', async () => {
        const handleChangeSpy= jest.fn();
        const wrapper = shallow(<Login handleChange={handleChangeSpy}  />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'handleChange');
        wrapper.find('.input-username').simulate('change', {target: { value: '', name: 'username'}});
        expect(instance.state.errors.username).toBe('User name is required');
    });

    test('should call handleChange for username  when not empty', async () => {
        const handleChangeSpy= jest.fn();
        const wrapper = shallow(<Login handleChange={handleChangeSpy}  />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'handleChange');
        wrapper.find('.input-username').simulate('change', {target: { value: 'username', name: 'username'}});
        expect(instance.state.errors.username).toBe('');
    });

    test('should call Login when wrong crendentials', async () => {
        window.alert = jest.fn();
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify([{id: 1, name:"Madhavi Vaka",email:"madhavi@gmail.com",mobile:"913131313",role:1,password:'12345'},
        {id: 2, name:"Balaji ganesh",email:"balaji@gmail.com",mobile:"789879879",role:2,password:'12345'}]));
        const handleChangeSpy= jest.fn();
        const LoginSpy = jest.fn();
        const wrapper = shallow(<Login handleChange={handleChangeSpy} login={LoginSpy}  />);
        const instance = wrapper.instance();
        instance.state.username = 'username';
        instance.state.password = 'password';
        jest.spyOn(instance, 'login');
        wrapper.find('.loginButton').simulate('click', {target: { value: '', name: ''}, preventDefault: jest.fn()});
        expect(instance.state.errors.username).toBe('');
        expect(instance.state.errors.password).toBe('');
    });


    test('should call Login when  crendentials are available', async () => {
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify([{id: 1, name:"Madhavi Vaka",email:"madhavi@gmail.com",mobile:"913131313",role:1,password:'12345'},
        {id: 2, name:"Balaji ganesh",email:"balaji@gmail.com",mobile:"789879879",role:2,password:'12345'}]));
        const handleChangeSpy= jest.fn();
        const LoginSpy = jest.fn();
        const wrapper = shallow(<Login handleChange={handleChangeSpy} login={LoginSpy}  />);
        const instance = wrapper.instance();
        instance.state.username = 'balaji@gmail.com';
        instance.state.password = '12345';
        jest.spyOn(instance, 'login');
        wrapper.find('.loginButton').simulate('click', {target: { value: '', name: ''}, preventDefault: jest.fn()});
        expect(instance.state.errors.username).toBe('');
        expect(instance.state.errors.password).toBe('');
    });
});
