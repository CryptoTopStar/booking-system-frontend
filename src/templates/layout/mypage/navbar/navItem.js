import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
} from '@mui/material'

// const useStyles = makeStyles((theme) => ({
//   item: {
//     display: 'flex',
//     paddingTop: 0,
//     paddingBottom: 0
//   },
//   button: {
//     color: theme.palette.text.secondary,
//     fontWeight: theme.typography.fontWeightMedium,
//     justifyContent: 'flex-start',
//     letterSpacing: 0,
//     padding: '10px 8px',
//     textTransform: 'none',
//     width: '100%'
//   },
//   icon: {
//     marginRight: theme.spacing(1)
//   },
//   title: {
//     marginRight: 'auto'
//   }
// }));

const NavItem = ({
  onClick,
  icon: Icon,
  title,
  ...rest
}) => {
  return (
    <ListItem

      disableGutters
      {...rest}
    >
      <Button

        onClick={onClick}
      >
        {Icon && (
          <Icon

            size="20"
          />
        )}
        <span>
          {title}
        </span>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
