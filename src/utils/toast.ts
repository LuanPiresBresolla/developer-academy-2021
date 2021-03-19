import Toast from 'react-native-tiny-toast';

export const ToastShow = (text: string): void => {
  Toast.show(text, {
    position: Toast.position.BOTTOM,
    containerStyle: { backgroundColor: '#1B1B1F', borderRadius: 20 },
    textStyle: {
      color: '#fff',
      fontFamily: 'RobotoSlab_400Regular',
    },
    animation: true,
    duration: 4000,
  });
};