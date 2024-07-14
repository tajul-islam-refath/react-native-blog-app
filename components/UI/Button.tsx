import {
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface ButtonProps {
  name: string;
  handleSubmit: () => void;
  btnStyle: StyleProp<ViewStyle>;
  textColor?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  name,
  handleSubmit,
  textColor,
  btnStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, btnStyle]}
      onPress={handleSubmit}
      activeOpacity={0.7}>
      <Text style={[styles.buttonText, {color: textColor}]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
