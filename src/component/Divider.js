import { View, Text } from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';

export default function Divider({
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  height,
  width,
  alignSelf,
  dividerColor,
}) {
  return (
    <View
      style={{
        backgroundColor: dividerColor ? dividerColor : colors.grey,
        height: height ? height : 1,
        width: width ? width : '100%',
        alignSelf: alignSelf ? alignSelf : 'center',
        marginTop: marginTop ? marginTop : 0,
        marginBottom: marginBottom ? marginBottom : 0,
        marginLeft: marginLeft ? marginLeft : 0,
        marginRight: marginRight ? marginRight : 0,
      }}
    />
  );
}
