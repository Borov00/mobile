import React from 'react';
import { Header as LibraryHeader, HeaderProps } from 'react-native-elements';

const Header: React.FC<HeaderProps> = props => {
  return (
    <LibraryHeader {...props} />
  );
}

export default Header;
