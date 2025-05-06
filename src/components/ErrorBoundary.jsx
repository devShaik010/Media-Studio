import React from 'react';
import { useLanguage } from '@context/LanguageContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const isRTL = this.props.language === 'ur';
      
      return (
        <div className={`flex flex-col items-center justify-center min-h-[400px] p-8 
          ${isRTL ? 'font-ur' : ''}`}>
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h1 className={`text-xl font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'کچھ غلط ہو گیا' : 'Something went wrong'}
          </h1>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              transition-colors duration-200"
          >
            {isRTL ? 'صفحہ ریفریش کریں' : 'Refresh Page'}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper to provide language context
export default function ErrorBoundaryWithLanguage(props) {
  const { language } = useLanguage();
  return <ErrorBoundary language={language} {...props} />;
}