import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { PERMISSIONS, RESULTS, request, checkMultiple } from 'react-native-permissions';

// Android permissions to request
const ANDROID_PERMISSIONS = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
];

// iOS permissions to request
const IOS_PERMISSIONS = [
  PERMISSIONS.IOS.CAMERA,
  PERMISSIONS.IOS.PHOTO_LIBRARY,
  PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PERMISSIONS.IOS.MICROPHONE,
];

/**
 * Request all necessary permissions for the app
 */
export const requestAllPermissions = async () => {
  try {
    if (Platform.OS === 'ios') {
      return await requestIOSPermissions();
    } else {
      return await requestAndroidPermissions();
    }
  } catch (err) {
    console.error('Permission request error:', err);
    return false;
  }
};

/**
 * Request iOS permissions
 */
const requestIOSPermissions = async () => {
  try {
    const results = await Promise.all(
      IOS_PERMISSIONS.map(permission => request(permission))
    );
    
    const allGranted = results.every(result => result === RESULTS.GRANTED);
    
    if (allGranted) {
      console.log('All iOS permissions granted');
      return true;
    } else {
      const denied = results.filter(r => r !== RESULTS.GRANTED);
      console.warn('Some iOS permissions denied:', denied);
      return false;
    }
  } catch (err) {
    console.error('iOS permission error:', err);
    return false;
  }
};

/**
 * Request Android permissions
 */
const requestAndroidPermissions = async () => {
  try {
    const results = await PermissionsAndroid.requestMultiple(ANDROID_PERMISSIONS);
    
    const allGranted = Object.values(results).every(
      result => result === PermissionsAndroid.RESULTS.GRANTED
    );
    
    if (allGranted) {
      console.log('All Android permissions granted');
      return true;
    } else {
      const denied = Object.entries(results)
        .filter(([_, result]) => result !== PermissionsAndroid.RESULTS.GRANTED)
        .map(([permission]) => permission);
      console.warn('Some Android permissions denied:', denied);
      return false;
    }
  } catch (err) {
    console.error('Android permission error:', err);
    return false;
  }
};

/**
 * Request camera permission
 */
export const requestCameraPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      return result === RESULTS.GRANTED;
    } else {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.error('Camera permission error:', err);
    return false;
  }
};

/**
 * Request photo library permission
 */
export const requestPhotoLibraryPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return result === RESULTS.GRANTED;
    } else {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.error('Photo library permission error:', err);
    return false;
  }
};

/**
 * Request microphone permission
 */
export const requestMicrophonePermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.MICROPHONE);
      return result === RESULTS.GRANTED;
    } else {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.error('Microphone permission error:', err);
    return false;
  }
};

/**
 * Request location permission
 */
export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return result === RESULTS.GRANTED;
    } else {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.error('Location permission error:', err);
    return false;
  }
};

/**
 * Check if all permissions are granted
 */
export const checkAllPermissions = async () => {
  try {
    if (Platform.OS === 'ios') {
      const results = await checkMultiple(IOS_PERMISSIONS);
      return Object.values(results).every(r => r === RESULTS.GRANTED);
    } else {
      const results = await PermissionsAndroid.checkMultiple(ANDROID_PERMISSIONS);
      return Object.values(results).every(
        r => r === PermissionsAndroid.RESULTS.GRANTED
      );
    }
  } catch (err) {
    console.error('Check permissions error:', err);
    return false;
  }
};
