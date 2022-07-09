import React from 'react';
import { Provider } from 'react-redux';
import { default as PropTypes } from 'prop-types';
import { Auth0Provider } from '@auth0/auth0-react';
import { SnackbarProvider } from 'notistack';

import config from '@config';
import { default as ConfigProvider } from '@providers/config/Provider';
import { default as UserProvider } from '@providers/user/Provider';
import { default as SubheaderProvider } from '@providers/subheader/Provider';
import { default as NavbarProvider } from '@providers/navbar/Provider';
import { default as PanelProvider } from '@providers/panel/Provider';
import { default as ItemProvider } from '@providers/item/Provider';
import { default as GuidelinePropertiesProvider } from '@providers/guidelineProperties/Provider';
import { default as ModalProvider } from '@providers/modal/Provider';
import { default as CurrentWorkProvider } from '@providers/currentWork/Provider';
import { default as DiagramsProvider } from '@providers/diagrams/Provider';
import { default as TDiagramsProvider } from '@providers/tdiagrams/Provider';
import { default as NotificationProvider } from '@providers/snackbar/Provider';
import { default as ProjectsProvider } from '@providers/projects/Provider';
import { default as SidebarProvider } from '@providers/sidebar/Provider';
import { default as store } from '@services/store';

const ProvidersContainer = ({ testStore, children }) => {
  return (
    <Provider store={testStore ? testStore : store}>
      <SnackbarProvider maxSnack={4} preventDuplicate>
        <NotificationProvider>
          <ConfigProvider>
          { testStore ? (
            <UserProvider>
              <CurrentWorkProvider>
                <SubheaderProvider>
                  <NavbarProvider>
                    <SidebarProvider>
                      <PanelProvider>
                        <DiagramsProvider>
                          <TDiagramsProvider>
                            <ProjectsProvider>
                              <ItemProvider>
                                <GuidelinePropertiesProvider>
                                  <ModalProvider>{children}</ModalProvider>
                                </GuidelinePropertiesProvider>
                              </ItemProvider>
                            </ProjectsProvider>
                          </TDiagramsProvider>
                        </DiagramsProvider>
                      </PanelProvider>
                    </SidebarProvider>
                  </NavbarProvider>
                </SubheaderProvider>
             </CurrentWorkProvider>
            </UserProvider>
          ) : (
     //       <Auth0Provider 
     //         domain={config.auth0.domain}
     //         clientId={config.auth0.clientId}
     //         redirectUri={config.auth0.redirectUri}
     //       > 
     
             <UserProvider>
               <CurrentWorkProvider>
                 <SubheaderProvider>
                    <NavbarProvider>
                      <SidebarProvider>
                        <PanelProvider>
                          <DiagramsProvider>
                            <TDiagramsProvider>
                              <ProjectsProvider>
                                <ItemProvider> 
                                  <GuidelinePropertiesProvider>
                                    <ModalProvider>{children}</ModalProvider>
                                  </GuidelinePropertiesProvider>
                                </ItemProvider>
                              </ProjectsProvider>
                            </TDiagramsProvider>
                          </DiagramsProvider>
                        </PanelProvider>
                      </SidebarProvider>
                    </NavbarProvider>
                  </SubheaderProvider>
                </CurrentWorkProvider>
              </UserProvider>
          //  </Auth0Provider>
          ) }
          </ConfigProvider>
        </NotificationProvider>
      </SnackbarProvider>
    </Provider>
  );
};

ProvidersContainer.propTypes = {
  testStore: PropTypes.any,
  children: PropTypes.any,
};
ProvidersContainer.defaultProps = {};

export default ProvidersContainer;
