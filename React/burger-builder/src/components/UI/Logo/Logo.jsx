import React from 'react';

import classes from './Logo.module.scss';

// import image as path then use that for src
import logoPath from '../../../assets/images/logo.png';

const logo = () => (
  <div className={classes.Logo}>
    <img src={logoPath} alt='Burger' />
  </div>
);

export default logo;
