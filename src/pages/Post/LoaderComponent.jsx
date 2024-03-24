import React from 'react';
import { Loader } from '@mantine/core';

const LoaderComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Loader size="md" />
    </div>
  );
};

export default LoaderComponent;