import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';

interface SectionHeaderOptions {
  titleStyle: TextStyle;
  textButtonStyle?: TextStyle;
  isTextButtonVisible?: boolean;
}
interface SectionHeaderData {
  buttonText?: String;
  title: String;
}

interface SectionHeaderType {
  options: SectionHeaderOptions;
  data: SectionHeaderData;
}

const Header = ({options, data}: SectionHeaderType) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={options.titleStyle}>{data.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
