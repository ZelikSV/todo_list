import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { routes } from '../../routes';

const Breadcrumbs = () => {
  const location = useLocation();

  const renderItems = () => {
    const res: string[] = ['Home'];

    Object.keys(routes).forEach((el) => {
      if (location?.pathname?.includes(el)) {
        res.push(routes[el].title);
      }
    });

    return res.map((item) => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>);
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>{renderItems()}</Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
