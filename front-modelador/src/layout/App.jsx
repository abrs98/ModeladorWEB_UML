import React, { Suspense, lazy, useEffect } from 'react';
import { Root } from '@mui-treasury/layout';
import { CssBaseline } from '@material-ui/core';

import { useUser } from '@providers';
import { CircularLoading, Snackbar } from '@layout/common/components';
const HeaderContainer = lazy(() =>
  import(/* webpackChunkName: 'Header' */ '@layout/header')
    .then((module) => ({ default: module.HeaderContainer }))
);
const SubheaderContainer = lazy(() =>
  import(/* webpackChunkName: 'Subheader' */ '@layout/subheader')
    .then((module) => ({ default: module.SubheaderContainer }))
);
const NavContainer = lazy(() =>
  import(/* webpackChunkName: 'Navbar' */ '@layout/navbar')
    .then((module) => ({ default: module.NavContainer }))
);
const SidebarContainer = lazy(() =>
  import(/* webpackChunkName: 'Sidebar' */ '@layout/sidebar')
    .then((module) => ({ default: module.SidebarContainer }))
);
const ContentContainer = lazy(() =>
  import(/* webpackChunkName: 'Content' */ '@layout/content')
    .then((module) => ({ default: module.ContentContainer }))
);
const ModalContainer = lazy(() =>
  import(/* webpackChunkName: 'Modal' */ '@layout/modal')
    .then((module) => ({ default: module.ModalContainer }))
);

import { default as scheme } from '@layout/scheme';
import { default as theme } from '@layout/theme';

const App = () => {
  const { user, isAuthenticated, checkAuth } = useUser();

  useEffect(() => {
   if (isAuthenticated) {
      checkAuth();
    }
  }, [user]);

  return (
    <Root theme={theme} scheme={scheme}>
      <CssBaseline />
       <Suspense fallback={<CircularLoading />}>
        {/*Contiene el apartado del botonn de ocultar menu y nombre de diagrama*/}
        <HeaderContainer />
        {/*Contiene la barra de navegacion entre apartados*/}
        <SubheaderContainer />
        {/*Contiene el menu con los items de cada apartado*/}
        <NavContainer />
        <SidebarContainer />
        {/*Contiene el dashboard de edicion de diagramas*/}
        <ContentContainer />
        <ModalContainer />
       </Suspense>
      <Snackbar />
    </Root>
  );
};

export default App;
