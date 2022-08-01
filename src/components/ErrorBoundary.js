import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasError : false,
            message: ""
        }
    }

    static getDerivedStateFromError(error){
        return {
            hasError : true
        }

    }

    componentDidCatch(error, errorInfo){
        console.log('logging error and error info',error,errorInfo);
    }

    render () {
                if(this.state.hasError){
                    return <h1>Something went wrong</h1>
                }
                return this.props.children;
    }
       
    
}