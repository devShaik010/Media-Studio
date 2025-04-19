import React from 'react';

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
      return (
        // Error container with styling
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          {/* Error message */}
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong.</h2>
          {/* Reload button */}
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
