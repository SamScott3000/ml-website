import React, { useEffect } from 'react';

const TestCors = () => {
  useEffect(() => {
    const testCors = async () => {
      try {
        const response = await fetch('http://localhost:5000/test-cors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('CORS test response:', data);
      } catch (error) {
        console.error('Error testing CORS:', error);
      }
    };

    testCors();
  }, []);

  return <div>Testing CORS...</div>;
};

export default TestCors;
