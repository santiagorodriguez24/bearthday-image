import React from 'react';
import { IoEarth } from 'react-icons/io5';

const AppLoader = (props) => {
  const { size = 65 } = props;
  return (
    <div className="app-loader-container">
      <div className="app-loader">
        <IoEarth size={size} />
      </div>
    </div>
  );
};

export default AppLoader;
