import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const SigninWithGoogle = async () => {
  try {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        '756702538267-c071cm0qib2lr7ns1qp1f37opfnm9s8g.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();

    const {idToken} = await GoogleSignin.signIn();
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    auth().signInWithCredential(googleCredentials);
    return userInfo;
  } catch (err) {
    console.log('google signin error==>', err);
    return null;
  }
};
