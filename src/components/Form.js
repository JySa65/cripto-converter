import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const {useState, useEffect} = React;

const Form = ({
  fiatCoin,
  setFiatCoin,
  coin,
  setCoin,
  setIsvalidForm,
  disabled,
  setDisabled,
}) => {
  const [coins, setCoins] = useState([]);

  const showAlert = ({status = 'Error', msg}) => {
    return Alert.alert(status, msg);
  };

  const getPrice = async () => {
    if (fiatCoin.trim() === '') {
      return showAlert({msg: 'Moneda requerida'});
    }
    if (coin.trim() === '') {
      return showAlert({msg: 'Criptomoneda requerida'});
    }
    setIsvalidForm(true);
    setDisabled(true);
  };

  useEffect(() => {
    const getCoins = async () => {
      const response = await fetch(
        'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD',
      );
      const {Data} = await response.json();
      setCoins(Data);
    };
    getCoins();
  }, []);

  return (
    <View>
      <Text black style={styles.label}>
        Moneda
      </Text>
      <Picker
        selectedValue={fiatCoin}
        onValueChange={(itemValue, itemIndex) => setFiatCoin(itemValue)}>
        <Picker.Item label="- Selecione -" value="" />
        <Picker.Item label="Dolares EEUU" value="USD" />
        <Picker.Item label="Pesos Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
      </Picker>
      <Text black style={styles.label}>
        CriptoMoneda
      </Text>
      <Picker
        selectedValue={coin}
        onValueChange={(itemValue, itemIndex) => setCoin(itemValue)}>
        <Picker.Item label="- Selecione -" value="" />
        {coins.map((item) => {
          const {
            CoinInfo: {FullName, Id, Internal},
          } = item;
          return <Picker.Item label={FullName} value={Internal} key={Id} />;
        })}
      </Picker>
      <View>
        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.7}
          style={styles.btnPrice}
          onPress={!disabled && getPrice}>
          <Text black style={styles.btnPriceText}>
            Cotizar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  btnPrice: {
    backgroundColor: '#5e49e2',
    padding: 10,
    marginTop: 10,
  },
  btnPriceText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default Form;
