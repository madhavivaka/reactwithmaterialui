import '@testing-library/jest-dom';
import Enzyme,{ shallow, mount } from 'enzyme';
import UsersList from "../../components/UsersList";
import Button from '@mui/material/Button';
import { render, screen } from '@testing-library/react';
import React, { useState as useStateMock } from 'react';
import {
    DataGrid
  } from '@mui/x-data-grid';
import DataGridMi from '../common/DataGridMi';


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}))
describe('UsersList',() => {
    const setState = jest.fn();
    let component = null;
    let dataGridMi = null;
    const processRowUpdate = jest.fn();
    function createTestProps(props) {
        return {
            rows: localStorage.getItem("users")
        };
    }

    beforeEach(() => {
        localStorage.setItem('users', JSON.stringify([
            {id: 1, name:"Madhavi Vaka",email:"madhavi@gmail.com",mobile:"913131313",role:1,password:'12345'},
            {id: 2, name:"Balaji ganesh",email:"balaji@gmail.com",mobile:"789879879",role:2,password:'12345'},
            {id: 3, name:"Divya",email:"divya@gmail.com",mobile:"32423423",role:2,password:'12345'},
            {id: 4, name:"Aadvik",email:"aadvik@gmail.com",mobile:"345345345",role:2,password:'12345'}
          ]));
        document.cookie= "username="+'balaji@gmail.com';
        document.cookie= "role="+'1';
        useStateMock.mockImplementation(init => [init, setState])

    });

    test('test Instance', () => {
        const wrapper = shallow(<UsersList />);
        expect(wrapper.exists()).toBe(true);
    });
    test('should call handleClickAdd', () => {
        const setState = jest.fn();
        const handleClick = jest.spyOn(React, 'useState');
        handleClick.mockImplementation(state => [state, setState]);
        const container = shallow(<UsersList />);
        const button  = container.find('#addUser1');
        button.simulate('click', {target: { value: '', name: ''}});
        expect(setState).toHaveBeenCalled();
    });

    test('should call handleInputChange on mobile input change', () => {
        const setState = jest.fn();
        const handleChange = jest.spyOn(React, 'useState');
        handleChange.mockImplementation(state => [state, setState]);
        const container = shallow(<UsersList />);
        const button  = container.find('.userlist-input-mobile');
        button.simulate('change', {target: { value: '9887654367', name: 'mobile'}});
        expect(setState).toHaveBeenCalled();
    });
    test('should call handleInputChange on name input change', () => {
        const setState = jest.fn();
        const handleChange = jest.spyOn(React, 'useState');
        handleChange.mockImplementation(state => [state, setState]);
        const container = shallow(<UsersList />);
        const button  = container.find('.input-firstName');
        button.simulate('change', {target: { value: 'test', name: 'firstName'}});
        expect(setState).toHaveBeenCalled();
    });
    test('should call handleInputChange on name input change', () => {
        const setState = jest.fn();
        const handleChange = jest.spyOn(React, 'useState');
        handleChange.mockImplementation(state => [state, setState]);
        const container = shallow(<UsersList />);
        const button  = container.find('#email');
        button.simulate('change', {target: { value: 'test@gmail.com', name: 'email'}});
        expect(setState).toHaveBeenCalled();
    });


    test('should call addUser', () => {
        const users = [
            {id: 1, name:"Madhavi Vaka",email:"madhavi@gmail.com",mobile:"913131313",role:1,password:'12345'},
            {id: 2, name:"Balaji ganesh",email:"balaji@gmail.com",mobile:"789879879",role:2,password:'12345'},
            {id: 3, name:"Divya",email:"divya@gmail.com",mobile:"32423423",role:2,password:'12345'},
            {id: 4, name:"Aadvik",email:"aadvik@gmail.com",mobile:"345345345",role:2,password:'12345'}
          ]
        localStorage.setItem('users', JSON.stringify(users));
        const setUserRole = jest.fn();
        const setOpenAdd = jest.fn();
        const setUsers = jest.fn();
        const setRowId = jest.fn();
        const setRole = jest.fn();
        const setOpen = jest.fn();
        const setEdit = jest.fn();
        const setError = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([{
            firstName: "Madhavi",
            email: "madhavi@gmail.com",
            mobile:"1234567891",
            password:"123",
            role:"1"
        }, setState]).mockReturnValueOnce([false, setOpen])
        .mockReturnValueOnce([users, setUsers])
        .mockReturnValueOnce([0, setRowId])
        .mockReturnValueOnce([0, setEdit])
        .mockReturnValueOnce([true, setOpenAdd])
        .mockReturnValueOnce([2, setRole])
        .mockImplementation(2,setUserRole)
        .mockReturnValueOnce([{
            firstName: "",
            email: "",
            mobile:"",
            password:"",
            role:""
        }, setError]);
        const container = shallow(<UsersList />);
        const input  = container.find('#add-user-button');
        input.simulate('click');
        expect(setState).toHaveBeenCalled();
    });


    test('should call handleCloseAdd', () => {
        const handleChange = jest.spyOn(React, 'useState');
        handleChange.mockImplementation(state => [{...state, openAdd: true}, setState]);
        const container = shallow(<UsersList />);
        const input  = container.find('#dialog-close-button');
        input.simulate('click');
        expect(setState).toHaveBeenCalledWith(false);
    });
    test('should check datagrid render', () => {
       let props= createTestProps();
        const wrapper = shallow(<UsersList />);
        let dataGridReact = wrapper.find('#usergridId');
        expect(dataGridReact).toBeDefined();
    });
});