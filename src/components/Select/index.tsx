import React from 'react';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

import { Container, SelectLabel } from './styles';

interface SelectProps extends PickerSelectProps {
  label?: string;
  disabled: boolean;
}

export function Select({ label, disabled, ...rest }: SelectProps) { 
  return (
    <Container>
      {label && <SelectLabel>{label}</SelectLabel>}

      <RNPickerSelect
        disabled={disabled}        
        pickerProps={{
          style: { color: '#7A7A80' },
          enabled: disabled
        }}        
        placeholder={{ label: 'Selecione o produto' }}
        style={{        
          placeholder: { color: '#7A7A80', fontFamily: 'RobotoSlab_400Regular' },
          viewContainer: { backgroundColor: '#DEDEE3' }, 
        }}
        {...rest}
      />
    </Container>
  );
  }