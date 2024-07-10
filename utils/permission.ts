import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const requestMicrophonePermission = async () => {
  const result = await check(PERMISSIONS.IOS.MICROPHONE);

  if (result === RESULTS.DENIED) {
    return request(PERMISSIONS.IOS.MICROPHONE);
  }
  return result;
};

export {requestMicrophonePermission};
