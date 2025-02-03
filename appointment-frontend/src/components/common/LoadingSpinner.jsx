// src/components/common/LoadingSpinner.jsx
const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;