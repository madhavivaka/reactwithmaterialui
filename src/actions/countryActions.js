export function addCountry(country)
{
    return {
        type:'ADD_COUNTRY',
        payload:country
    }
}

export function deleteCountry(id)
{
    return {
        type:'DELETE_COUNTRY',
        payload:id
    }
}

export function updateCountry(country)
{
    console.log("update country-----",country);
    return {
        type:'UPDATE_COUNTRY',
        payload:country
    }

}
export function logout(country)
{
    return {
        type:'USER_LOGOUT'
    }

}