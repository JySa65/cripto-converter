import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Price = ({ticker}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text black style={[styles.text, styles.price]}>
          {ticker.PRICE}
        </Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>Máximo:</Text>
        <Text black style={styles.text}>
          {ticker.HIGHDAY}
        </Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>Mínimo:</Text>
        <Text black style={styles.text}>
          {ticker.LOWDAY}
        </Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>Variacion 24hrs:</Text>
        <Text black style={styles.text}>
          {ticker.CHANGEPCT24HOUR}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5e49e2',
    marginTop: '2.5%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerText: {
    flexDirection: 'row',
    marginVertical: '2.5%',
  },
  text: {
    marginRight: '2%',
    color: '#fff',
    marginBottom: 3,
    fontSize: 18,
  },
  price: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Price;
