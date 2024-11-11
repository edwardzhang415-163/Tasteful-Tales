import { CommonActions } from '@react-navigation/native';

export const navigateToScreen = (navigation, screenName, params = {}) => {
  navigation.navigate(screenName, params);
};

export const resetToScreen = (navigation, screenName, params = {}) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenName, params }],
    })
  );
};

export const goBack = (navigation) => {
  navigation.goBack();
};

export const navigateToPost = (navigation, postId) => {
  navigation.navigate('PostDetails', { postId });
};

export const navigateToEditProfile = (navigation, userData) => {
  navigation.navigate('EditProfile', userData);
};

export const navigateToNewEvent = (navigation) => {
  navigation.navigate('NewEvent');
};

export const navigateToEditEvent = (navigation, eventData) => {
  navigation.navigate('EditEvent', eventData);
}; 