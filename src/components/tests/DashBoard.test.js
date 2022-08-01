import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import DashBoard from "../../components/DashBoard";
import React, { useState as useStateMock } from 'react';


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}))
describe('DashBoard',() => {
    const setState = jest.fn();
    beforeEach(() => {
        localStorage.setItem('hotels', JSON.stringify([
            {id: 1, name:"The Park Hotel",email:"thepark@gmail.com",mobile:"913131313",starRating:5, image:"https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/templates/reactt2_1200x303.png?sfvrsn=3ddeaf3b_2"},
            {id: 2, name:"Star Hotel",email:"star@gmail.com",mobile:"789879879",starRating:4,image:"https://www.cloudanalogy.co.uk/wp-content/uploads/2019/06/react-1-300x300.png"},
            {id: 3, name:"Diamond park hotel",email:"daimondpark@gmail.com",mobile:"32423423",starRating:5,image:null},
            {id: 4, name:"Cassels Hotel",email:"cassels@gmail.com",mobile:"345345345",starRating:3}
          ]));
        document.cookie= "username="+'balaji@gmail.com';
        document.cookie= "role="+'1';
        useStateMock.mockImplementation(init => [init, setState])
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('test Instance', () => {
        const wrapper = shallow(<DashBoard />);
        expect(wrapper.exists()).toBe(true);
    });

    test('should call handleClickAdd', () => {
        const setState = jest.fn();
        const handleClick = jest.spyOn(React, 'useState');
        handleClick.mockImplementation(state => [state, setState]);
        const container = shallow(<DashBoard />);
        const button  = container.find('#addHotel');
        button.simulate('click', {target: { value: '', name: ''}});
        expect(setState).toHaveBeenCalled();
    });


    test('should call handleInputChange on moblie input change', () => {
        const hotels = [
            {id: 1, name:"The Park Hotel",email:"thepark@gmail.com",mobile:"913131313",starRating:5, image:"https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/templates/reactt2_1200x303.png?sfvrsn=3ddeaf3b_2"},
            {id: 2, name:"Star Hotel",email:"star@gmail.com",mobile:"789879879",starRating:4,image:"https://www.cloudanalogy.co.uk/wp-content/uploads/2019/06/react-1-300x300.png"},
            {id: 3, name:"Diamond park hotel",email:"daimondpark@gmail.com",mobile:"32423423",starRating:5,image:null},
            {id: 4, name:"Cassels Hotel",email:"cassels@gmail.com",mobile:"345345345",starRating:3}
          ]
        localStorage.setItem('hotels', JSON.stringify(hotels));
        const setState = jest.fn();
        const setOpenAdd = jest.fn();
        const setHotels = jest.fn();
        const setRowId = jest.fn();
        const setRole = jest.fn();
        const setOpen = jest.fn();
        const setEdit = jest.fn();
        const setErrors = jest.fn();

        React.useState = jest.fn().mockReturnValueOnce([{
                name: "",
                email: "",
                mobile:"",
                starRating:"",
                image:null
        }, setState]).mockReturnValueOnce([false, setOpen])
        .mockReturnValueOnce([hotels, setHotels])
        .mockReturnValueOnce([0, setRowId])
        .mockReturnValueOnce([0, setEdit])
        .mockReturnValueOnce([true, setRole])
        .mockReturnValueOnce([true, setOpenAdd])
        .mockReturnValueOnce([{
            name: "",
            email: "",
            mobile:"",
            starRating:""
        }, setErrors]);
        const container = shallow(<DashBoard />);
        const input  = container.find('.input-mobile');
        input.simulate('change', {target: { value: '9989889390', name: 'mobile'}});
         expect(setState).toHaveBeenCalled();
    });


    test('should call saveHotel when edit not equal to 0', () => {
        const hotels = [
            {id: 1, name:"The Park Hotel",email:"thepark@gmail.com",mobile:"913131313",starRating:5, image:"https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/templates/reactt2_1200x303.png?sfvrsn=3ddeaf3b_2"},
            {id: 2, name:"Star Hotel",email:"star@gmail.com",mobile:"789879879",starRating:4,image:"https://www.cloudanalogy.co.uk/wp-content/uploads/2019/06/react-1-300x300.png"},
            {id: 3, name:"Diamond park hotel",email:"daimondpark@gmail.com",mobile:"32423423",starRating:5,image:null},
            {id: 4, name:"Cassels Hotel",email:"cassels@gmail.com",mobile:"345345345",starRating:3}
          ]
        localStorage.setItem('hotels', JSON.stringify(hotels));
        const setState = jest.fn();
        const setOpenAdd = jest.fn();
        const setHotels = jest.fn();
        const setRowId = jest.fn();
        const setRole = jest.fn();
        const setOpen = jest.fn();
        const setEdit = jest.fn();
        const setErrors = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([{
                name: "Madhavi",
                email: "Madhavi@gmail.com",
                mobile:"1234567891",
                starRating:"5",
                image:null
        }, setState]).mockReturnValueOnce([false, setOpen])
        .mockReturnValueOnce([hotels, setHotels])
        .mockReturnValueOnce([0, setRowId])
        .mockReturnValueOnce([1, setEdit])
        .mockReturnValueOnce([true, setRole])
        .mockReturnValueOnce([true, setOpenAdd])
        .mockReturnValueOnce([{
            name: "",
            email: "",
            mobile:"",
            starRating:""
        }, setErrors]);
        const container = shallow(<DashBoard />);
        const input  = container.find('.saveHotelBtn');
        input.simulate('click');
        expect(setHotels).toHaveBeenCalled();
    });


    test('should call saveHotel when edit equal to 0', () => {
        const hotels = [
            {id: 1, name:"The Park Hotel",email:"thepark@gmail.com",mobile:"913131313",starRating:5, image:"https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/templates/reactt2_1200x303.png?sfvrsn=3ddeaf3b_2"},
            {id: 2, name:"Star Hotel",email:"star@gmail.com",mobile:"789879879",starRating:4,image:"https://www.cloudanalogy.co.uk/wp-content/uploads/2019/06/react-1-300x300.png"},
            {id: 3, name:"Diamond park hotel",email:"daimondpark@gmail.com",mobile:"32423423",starRating:5,image:null},
            {id: 4, name:"Cassels Hotel",email:"cassels@gmail.com",mobile:"345345345",starRating:3}
          ]
        localStorage.setItem('hotels', JSON.stringify(hotels));
        const setState = jest.fn();
        const setOpenAdd = jest.fn();
        const setHotels = jest.fn();
        const setRowId = jest.fn();
        const setRole = jest.fn();
        const setOpen = jest.fn();
        const setEdit = jest.fn();
        const setErrors = jest.fn();
        React.useState = jest.fn().mockReturnValueOnce([{
                name: "Madhavi",
                email: "Madhavi@gmail.com",
                mobile:"1234567891",
                starRating:"5",
                image:null
        }, setState]).mockReturnValueOnce([false, setOpen])
        .mockReturnValueOnce([hotels, setHotels])
        .mockReturnValueOnce([0, setRowId])
        .mockReturnValueOnce([0, setEdit])
        .mockReturnValueOnce([true, setRole])
        .mockReturnValueOnce([true, setOpenAdd])
        .mockReturnValueOnce([{
            name: "",
            email: "",
            mobile:"",
            starRating:""
        }, setErrors]);
        const container = shallow(<DashBoard />);
        const input  = container.find('.saveHotelBtn');
        input.simulate('click');
        expect(setHotels).toHaveBeenCalled();
    });
});