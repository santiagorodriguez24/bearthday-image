import React from 'react';
import PublicNavBar from 'components/PublicNavBar';
import PublicFooter from 'components/PublicFooter';

const MainLayout = (props) => {
  const { children } = props;

  return (
    <div className="main-layout">
      <PublicNavBar />
      <div className="main-layout-content">
        {children}
      </div>
      <PublicFooter />
    </div>
  );
};

export default MainLayout;
