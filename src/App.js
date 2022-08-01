import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import Fallback  from './components/Fallback';
import CreateRoutes from './routes';


function App() {
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://jsonplaceholder.typicode.com/posts`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      });
  }, [setAppState]);

   const errorHandler = (error,errorInfo) =>{
    console.log("logging error",error,errorInfo);
   }
  return (
      <div className="App">

       <ErrorBoundary FallbackComponent= {Fallback} onError={errorHandler} >    
          <CreateRoutes />
        </ErrorBoundary>
      </div>
  );
}

export default App;
