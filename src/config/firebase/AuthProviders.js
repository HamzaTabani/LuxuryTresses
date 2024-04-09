import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {ShowToast} from '../../utils';

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

export const SigninWithFacebook = async resCallback => {
  try {
    await LoginManager.logOut();
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (
      result.declinedPermissions &&
      result.declinedPermissions.includes('email')
    ) {
      resCallback({message: 'Email is required'});
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      console.log('Something went wrong obtaining access token');
    } else {
      console.log('facebook token', data.accessToken);
    }
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    let infoRequest = new GraphRequest(
      '/me?fields=email,first_name,last_name,picture',
      null,
      resCallback
    );
    new GraphRequestManager().addRequest(infoRequest).start();
    await firebase.auth().signInWithCredential(facebookCredential);
    console.log('user logged in facebook');
  } catch (error) {
    console.error('Facebook login error:', error);
  }
};


