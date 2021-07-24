import React, { FC } from 'react';
import { Route, Switch } from 'react-router';

import { routes } from './routes';
import Todo from './pages/Todo';
import Home from './pages/Home';

const MainRouter: FC = () => {
  return (
    <Switch>
      <Route path={routes.home.path} component={Home} />
      <Route exact path={routes.todo.path} component={Todo} />
    </Switch>
  );
};

export default MainRouter;
