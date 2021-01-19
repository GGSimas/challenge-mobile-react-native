import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import marvelLogo from '../../assets/MarvelLogo.png';
const Header: React.FC = ({children}) => (
  <View style={styled.header}>
    <Image style={styled.headerLogo} source={marvelLogo} />
    {children}
  </View>
);

const styled = StyleSheet.create({
  header: {
    height: 160,
    backgroundColor: '#EB2227',
    alignItems: 'center',
  },
  headerLogo: {
    width: 155,
    height: 55,
    margin: 10,
  },
});
export default Header;
