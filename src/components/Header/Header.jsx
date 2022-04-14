import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import useMatchMedia from 'use-match-media-hook';

import classes from './Header.module.scss';
import Logo from '../../assets/img/logo.svg';
import Menu from './Menu';

import Modal from '../Modal';
import { SignUp } from '../SignUp';
import { Login } from '../SignUp';

const menuItems = [
  {
    url: '#',
    text: 'Features',
  },
  {
    url: '#',
    text: 'Prices',
  },
  {
    url: '#',
    text: 'Resources',
  },
];

const queries = ['(max-width: 766px)', '(min-width: 767px)'];

const Header = () => {
  const [mobile] = useMatchMedia(queries);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const openSignUp = () => setSignUpOpen(true);
  const closeSignUp = () => setSignUpOpen(false);
  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  return (
    <>
      <header className={`${classes.header} container`}>
        <img src={Logo} alt="logo" className={classes.logo} />
        {mobile ? (
          <IoMenu
            className={classes.burger}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          />
        ) : (
          <Menu
            links={menuItems}
            handleSignUp={openSignUp}
            handleLogin={openLogin}
          />
        )}
        <AnimatePresence>
          {showMobileMenu && mobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={classes.mobileMenu}
            >
              <Menu
                links={menuItems}
                handleSignUp={openSignUp}
                handleLogin={openLogin}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <Modal open={isSignUpOpen} title="Sign Up" handleClose={closeSignUp}>
        <SignUp closeModal={closeSignUp} />
      </Modal>
      <Modal open={isLoginOpen} title="Sign In" handleClose={closeLogin}>
        <Login closeModal={closeLogin} />
      </Modal>
    </>
  );
};

export default Header;
