import React, { memo } from 'react';

import { AppHeader } from './app-header';
import { useAppContainerStyles } from './use-app-container-styles';
import { AppFooter } from './app-footer';
import Container from '@material-ui/core/Container';
import c from 'classnames';

type AppContainerProps = {
  showFooter?: boolean;
  hasCustomContainer?: boolean;
  containerClass?: string;
  children: any;
};

export const AppContainer = memo(
  ({
    children,
    showFooter = true,
    containerClass,
    hasCustomContainer,
  }: AppContainerProps) => {
    const classes = useAppContainerStyles();
    return (
      <section className={classes.container}>
        <AppHeader />
        {hasCustomContainer ? (
          children
        ) : (
          <Container
            maxWidth='xl'
            className={c(containerClass, classes.containerContent)}
          >
            {children}
          </Container>
        )}
        {showFooter && <AppFooter />}
      </section>
    );
  },
);
