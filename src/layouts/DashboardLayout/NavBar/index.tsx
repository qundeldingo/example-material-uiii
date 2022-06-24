import React, { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
} from 'react-feather'
import { MenuItems, calculateMenuItems } from '@iteria-app/component-templates'
import * as graphqlGen from '../../../generated/graphql'
import { Home } from 'react-feather'

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}))

const NavBar = ({ onMobileClose, openMobile }) => {
  const intl = useIntl()

  const items = [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard',
    },
    {
      href: '/app/products',
      icon: ShoppingBagIcon,
      title: 'Products',
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: 'Account',
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Settings',
    },
    {
      href: '/login',
      icon: LockIcon,
      title: 'Login',
    },
    {
      href: '/register',
      icon: UserPlusIcon,
      title: 'Register',
    },
    {
      href: '/404',
      icon: AlertCircleIcon,
      title: 'Error',
    },
  ]
  const classes: any = useStyles()
  const location = useLocation()

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          <MenuItems
            items={[
              {
                className: '',
                href: '/app/dashboard',
                icon: Home,
                label: 'menu.dashboard',
                title: 'Dashboard',
              },
              ...calculateMenuItems(graphqlGen, UserIcon),
            ]}
          />
        </List>
      </Box>
    </Box>
  )

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
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
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
}

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
}

export default NavBar
