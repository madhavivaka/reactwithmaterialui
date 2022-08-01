import React,{ Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Navigate} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import {cookies} from 'react-cookie';

export default class Login extends Component {
   
    constructor(props) {
        super(props);
        this.state = {username: '', password:'', errors:{username:'',password:''},loggedIn: false};
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }
    
      handleChange(event) {
        let errors = this.state.errors;
        switch (event.target.name) {
            case 'username': 
              errors.username = 
                event.target.value === ''
                  ? 'User name is required'
                  : '';
              break;
            case 'password': 
              errors.password = 
                event.target.value === ''
                  ? 'Password is required'
                  : '';
              break;
            default:
              break;
          }
        this.setState({errors,[event.target.name]: event.target.value});
      }
 
    
      login(event) {
        event.preventDefault();
        const apiUrl = 'http://localhost:8000/login';
        let username = this.state.username;
        let password = this.state.password;
        console.log(JSON.stringify({username:username,password:password}));
        console.log("errorr------------",this.state.errors);
        if(this.state.errors.username === '' && this.state.errors.password === ''){
            // fetch(apiUrl,{
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({username:username,password:password})
            // })
            //   .then((response) => response.json())
            //   .then((data) => {
            //     if(data.statusCode !== 200){
            //        alert(data.message)
            //     }
            //     else{
            //       console.log('This is your data', data);
            //       this.setState({loggedIn:true});
            //     }
            // });
            const users = JSON.parse(localStorage.getItem('users'));
            console.log(users)
            const result = users.filter(user => (user.email == username && user.password == password));

            console.log(result);
            if(result && result.length>0){
                       console.log('This is your data', result[0]);
                       this.setState({loggedIn:true});
                       localStorage.setItem('loggedInUser', JSON.stringify(result[0]));
                       document.cookie= "username="+username;
                       document.cookie= "role="+result[0].role;

                      // const { cookie } = this.props;
                       //cookie.set('role', result[0].role, { path: '/' });
            }else{
              alert("login failed")
            }

        }
        else{
            alert('Please fill the required fields')

        }
       
      }
    
    render ()  {
      if(this.state.loggedIn){
        return <Navigate to="/dashBoard" replace={true} />
      }


        return (
            <>
         <div><h2>LOGIN</h2></div>   
        <div style={{ padding: 30 }}>
            
        <TextField
        className="input-username"
        inputProps={{ "data-testid": "content-input" }}
        data-testid="input-username"
          required
          id="outlined-required"
          label="UserName"
          name="username"
          value={this.state.username }
          onChange={this.handleChange}
          noValidate />
        {this.state.errors.username.length > 0 && 
        <span className='error' name="UserNameError">{this.state.errors.username}</span>}
        </div>
        <div>
        <TextField
        inputProps={{ "data-testid": "content-input" }}
        data-testid="input-password"
        className="input-password"
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          noValidate />
          </div>
          {this.state.errors.password.length > 0 && 
        <span className='error' id="PasswordError" name="PasswordError" data-testid="input-password-error">{this.state.errors.password}</span>}
          <div style={{ padding: 30 }}>
          <Button variant="contained" name="submit" className="loginButton"
           data-testid="input-submit" onClick={this.login}>LOGIN</Button>
          </div>
          </>
        )
    }
}