import React, {FC} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useToast } from '../hooks/useToast';
import { ToastType } from './ToastProvider';

export const CallToast: FC = () => {
  const { showToast } = useToast();
  
  return (
    <TouchableOpacity
      onPress={() => showToast(ToastType.Error, 'Error toast')}>
      <Text>Show error</Text>
    </TouchableOpacity>
  );
}