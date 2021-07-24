import React from 'react';
import { Menu as AntMenu } from 'antd';
import { NavLink } from 'react-router-dom';

import { Route } from '../../routes';

type Props = {
  items: Route[];
};

const Menu: React.FC<Props> = ({ items }) => (
  <AntMenu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
    {items.map((element) => (
      <AntMenu.Item key={element.title}>
        <NavLink to={element.path}>{element.title}</NavLink>
      </AntMenu.Item>
    ))}
  </AntMenu>
);

export default Menu;
