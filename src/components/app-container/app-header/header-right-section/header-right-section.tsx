import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useAutoCallback } from 'hooks.macro';
import React, { memo, MouseEvent, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { globalMessages } from '../../../../app-global.messages';
import { ROUTES } from '../../../../app.constants';
import { AppLink } from '../../../app-link';
import { useAppHeaderLogic } from '../use-app-header-logic';
import { useHeaderRightSectionStyles } from './use-header-right-section-styles';

export const HeaderRightSection = memo(() => {
  const { photoURL, user, onSignOutClick } = useAppHeaderLogic();
  const { formatMessage } = useIntl();
  const classes = useHeaderRightSectionStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openProfileMenu = useAutoCallback((event: MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  });

  const closeProfileMenu = useAutoCallback(() => {
    setAnchorEl(null);
  });

  const renderUserInfo = useAutoCallback(() => (
    <>
      <Avatar
        src={photoURL}
        className={classes.avatar}
        onClick={openProfileMenu}
      />
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeProfileMenu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Link
          to={`${ROUTES.profile}${ROUTES.settings}`}
          className={classes.profileItem}
        >
          <MenuItem>{formatMessage(globalMessages.profileSettings)}</MenuItem>
        </Link>

        <MenuItem onClick={onSignOutClick}>
          {formatMessage(globalMessages.signOut)}
        </MenuItem>
      </Menu>
    </>
  ));

  const renderSignInLink = useAutoCallback(() => (
    <AppLink className={classes.authLink} to={ROUTES.signIn}>
      {formatMessage(globalMessages.signIn)}
    </AppLink>
  ));

  return (
    <div className={classes.rightContent}>
      {user ? renderUserInfo() : renderSignInLink()}
    </div>
  );
});
