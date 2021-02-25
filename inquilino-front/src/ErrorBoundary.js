import React from 'react';
import './App.css'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <div className='errorBoundaryContainer'>
                <div className='errorBoundary'>
                    <h1>Anda! Esto no funciona...</h1>
                    <div className='pulp' />
                </div>

            </div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary
