export type Route = {
  title: string;
  path: string;
};

export type Routes = {
  [key: string]: Route;
};

export const routes: Routes = {
  home: {
    title: 'Home',
    path: '/',
  },
  todo: {
    title: 'Todo',
    path: '/todo',
  },
};
