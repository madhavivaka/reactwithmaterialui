import React from "react";

const apiUrl = 'http://localhost:8000/login';

const executeRequest = (request) =>{
    fetch(apiUrl,{
        method: request.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("resposne from api------------",data);
        if(data.statusCode !== 200){
            return data;
        }
        else{
            console.log('This is your data', data);
            return data;
        }
  });
}

export default executeRequest;

