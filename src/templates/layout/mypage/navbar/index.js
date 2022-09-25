import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  LogOut as LogOutIcon,
} from 'react-feather';
import NavItem from './navItem';
import GlobalContext from '../../../../context/global-context'
import AuthService from "../../../../services/auth";
import useConfirm from '../../../../hooks/useConfirm'

// const useStyles = makeStyles(() => ({
//   mobileDrawer: {
//     width: 256
//   },
//   desktopDrawer: {
//     width: 256,
//     top: 64,
//     height: 'calc(100% - 64px)'
//   },
//   avatar: {
//     cursor: 'pointer',
//     width: 64,
//     height: 64
//   }
// }));

const NavBar = ({ location, onMobileClose, openMobile }) => {
  const context = React.useContext(GlobalContext);
  console.log(context);
  const confirm = useConfirm();
  const navigate = useNavigate();
  useEffect(() => {
    if (!context.state.signedIn) navigate('/')
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    await AuthService.signOut()
    context.updateState({
      signedIn: false,
      session: {}
    })
    confirm({ alert: true, description: 'ログアウトしました' })
      .then(() => {
        navigate('/')
      })
  };

  const items = [
    {
      icon: HomeIcon,
      title: 'Home',
      handleAction: () => navigate('/')
    },
    {
      icon: LogOutIcon,
      title: 'LogOut',
      handleAction: async () => {
        await signOut()
      }
    }
  ];

  const content = (
    <GlobalContext.Consumer>
      {context => (
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            p={2}
          >
            <Typography
              variant="subtitle1"
            >
              {context.state.username}
            </Typography>
          </Box>
          <Divider />
          <Box p={2}>
            <List>
              {items.map((item) => (
                <NavItem
                  onClick={item.handleAction}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ))}
            </List>
          </Box>
        </Box>
      )}
    </GlobalContext.Consumer>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
