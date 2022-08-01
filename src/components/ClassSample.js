import { Component } from "react";


export default class ClassSample extends Component {
    componentDidMount() {
        const apiUrl = 'https://api.github.com/users/hacktivist123/repos';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => console.log('This is your data', data));
    }
    render () {
        return (
        <div>
            <h1>This is class component example</h1>
        </div>
        );
    }
}