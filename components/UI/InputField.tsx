import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (name: string) => void;
  placeholder?: string;
  placeholderColor?: string | null;
  error?: string | null;
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  placeholderColor,
  error,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputWarpare}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, {borderColor: error ? 'red' : '#ccc'}]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor || '#000'}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.inputLabelError}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputWarpare: {
    marginVertical: 10,
    display: 'flex',
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#000',
  },
  input: {
    fontSize: 14,
    color: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  inputLabelError: {
    fontSize: 14,
    color: 'red',
  },
});
