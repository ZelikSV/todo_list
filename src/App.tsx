import React, { FC } from 'react';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import Menu from './components/Menu/Menu';
import { routes } from './routes';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

const { Header, Content } = Layout;

const App: FC = () => {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header>
          <Menu items={Object.values(routes)} />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumbs />
          <MainRouter />
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
