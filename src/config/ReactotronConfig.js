import Reactotron from 'reactotron-react-native';

// eslint-disable-next-line no-undef
if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear(); // erases timeline when the app refreshes
}
