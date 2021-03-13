import * as React from 'react';

import {Text, StyleSheet, Platform, View} from 'react-native';

const Header = () => (
  <View style={styles.container}>
    <Text black style={styles.title}>
      Criptomonedas
    </Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    backgroundColor: '#5e49e2',
    paddingBottom: 10,
    marginBottom: 30,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Header;
