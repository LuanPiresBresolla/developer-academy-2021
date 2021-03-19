import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { InputLabel, TextInput, Container } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  label?: string;
  containerStyle?: {};
}

interface InputValueReference {
  value: string;
}

export function Input({ name, label, containerStyle, ...rest }: InputProps) {
  const inputElementRef = useRef<any>(null);

  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle}>
      {label && <InputLabel>{label}</InputLabel>}

      <TextInput 
        placeholderTextColor="#7A7A80"
        ref={inputElementRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}        
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};