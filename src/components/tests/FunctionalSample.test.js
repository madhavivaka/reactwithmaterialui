import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import FunctionalSample from "../../components/FunctionalSample";
import Button from '@mui/material/Button';



describe('FunctionalSample',() => {
    
    beforeEach(() => {
        localStorage.setItem('hotels', JSON.stringify([]));
        document.cookie= "username="+'balaji@gmail.com';
        document.cookie= "role="+'admin';
    });

    test('test Instance', () => {
        const wrapper = shallow(<FunctionalSample  />);
        expect(wrapper.exists()).toBeTruthy();
    });

});