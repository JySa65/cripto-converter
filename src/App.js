import * as React from 'react';

import {
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Header from './components/Header';
import Form from './components/Form';
import Price from './components/Price';

import applyGlobalFonts from './utils/applyGlobalFonts';
const {useState, useEffect} = React;
const App = () => {
  applyGlobalFonts();
  const [fiatCoin, setFiatCoin] = useState('');
  const [coin, setCoin] = useState('');
  const [isvalidForm, setIsvalidForm] = useState(false);
  const [ticker, setTicker] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isvalidForm) {
      setTicker({});
      const getTicker = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin},ETH&tsyms=${fiatCoin}`;
        const response = await fetch(url);
        const {DISPLAY} = await response.json();
        setTicker(DISPLAY[coin][fiatCoin]);
      };
      getTicker();
      setIsvalidForm(false);
      setDisabled(false);
    }
  }, [isvalidForm, coin, fiatCoin]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <Image
          source={require('./assets/img/cryptomonedas.png')}
          style={styles.image}
        />
        <View style={styles.containerForm}>
          <Form
            fiatCoin={fiatCoin}
            coin={coin}
            disabled={disabled}
            setFiatCoin={setFiatCoin}
            setCoin={setCoin}
            setIsvalidForm={setIsvalidForm}
            setDisabled={setDisabled}
          />
        </View>
        {disabled ? (
          <View style={{marginTop: '10%'}}>
            <ActivityIndicator size="large" color="#5e49e2" />
          </View>
        ) : (
          Object.keys(ticker).length >= 1 && <Price ticker={ticker} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  containerForm: {
    marginHorizontal: '2.5%',
  },
});

export default App;
