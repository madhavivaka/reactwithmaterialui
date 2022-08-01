const countries = [ { id:1, name:'India',code:'IN'}]
const initialState = {
    countriesList : countries
}
const countryReducer = (state = countries,action) => {
    let countryState;
    switch(action.type){
    
    case 'ADD_COUNTRY':
     countryState = [...state, action.payload ];
    return countryState;
    
    case 'DELETE_COUNTRY':
    countryState = state.filter( x => x.id !== action.payload.id);
    localStorage.setItem('countries',JSON.stringify(countryState));
    return countryState;
        
    case 'UPDATE_COUNTRY':
    countryState = state.map((country) => {
        console.log(action.payload)
        const {id,name,code} = action.payload.params;
        if(country.id === id)
        {
            country.name = name;
            country.code = code;
        }
        return country;
    })
    localStorage.setItem('countries',JSON.stringify(countryState));
    return countryState;

    case 'USER_LOGOUT':
    countryState = [...state, action.payload ];
    return countryState;
    
    default:
        return state;
    }
    
    }
    export default countryReducer;