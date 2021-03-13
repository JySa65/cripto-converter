import * as React from 'react';
import {Text, StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  defaultFontRegular: {
    fontFamily: 'Lato-Regular',
  },
  defaultFontBlack: {
    fontFamily: 'Lato-Black',
  },
});

function fonts(props) {
  if (props.regular) {
    return styles.defaultFontRegular;
  }
  if (props.black) {
    return styles.defaultFontBlack;
  }
  return styles.defaultFontRegular;
}

export default function applyGlobalFonts() {
  const oldTextRender = Text.render;
  const oldTextInputRender = TextInput.render;
  Text.render = (...args) => {
    const origin = oldTextRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [fonts(origin.props), origin.props.style],
    });
  };
  TextInput.render = (...args) => {
    const origin = oldTextInputRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [fonts(origin.props), origin.props.style],
    });
  };
}
