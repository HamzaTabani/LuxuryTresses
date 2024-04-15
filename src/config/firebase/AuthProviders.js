import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';

export const SigninWithGoogle = async () => {
  try {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        '756702538267-c071cm0qib2lr7ns1qp1f37opfnm9s8g.apps.googleusercontent.com',
      iosClientId:
        '756702538267-p7qbmov0e2id9omrtouu355f6n3go9se.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    // const userInfo = await GoogleSignin.signIn();

    const {idToken, user} = await GoogleSignin.signIn();
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    // console.log('googluuuuuu credentials', googleCredentials);
    const currentUser = auth().currentUser;
    if (currentUser.email) {
      const signInMethods = await auth().fetchSignInMethodsForEmail(
        currentUser.email,
      );
      // return console.log('signin methodsss', signInMethods)

      if (signInMethods.includes('facebook.com')) {
        // If the user is already signed in with Google, link the Facebook credential
        await currentUser.linkWithCredential(googleCredentials);
        console.log('Google account linked successfully.');
      } else {
        await firebase.auth().signInWithCredential(googleCredentials);
      }
    } else {
      await firebase.auth().signInWithCredential(googleCredentials);
    }
    // const currentUser = auth().currentUser;
    // if (
    //   currentUser &&
    //   !currentUser.providerData.some(
    //     provider => provider.providerId === 'facebook.com',
    //   )
    // ) {
    //   // If the user is not already linked with Facebook, prompt them to link their account
    //   // Implement linking with Facebook similar to the process below
    //   // Example: await LinkWithFacebook(currentUser);
    //   await auth().currentUser.linkWithCredential(currentUser);
    // }
    return user;
  } catch (err) {
    console.log('google signin error==>', err);
    return null;
  }
};

export const SigninWithFacebook = async (resCallback, setLoader) => {
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
      setLoader(false);
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
      resCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();

    // console.log('current user info', currentUser.providerData)

    const currentUser = auth().currentUser;
    if (currentUser.email) {
      const signInMethods = await auth().fetchSignInMethodsForEmail(
        currentUser.email,
      );
      // return console.log('signin methodsss', signInMethods)

      if (signInMethods.includes('google.com')) {
        // If the user is already signed in with Google, link the Facebook credential
        await currentUser.linkWithCredential(facebookCredential);
        console.log('Facebook account linked successfully.');
      } else {
        await firebase.auth().signInWithCredential(facebookCredential);
      }
    } else {
      await firebase.auth().signInWithCredential(facebookCredential);
    }
    console.log('user logged in facebook');
  } catch (error) {
    console.error('Facebook login error:', error);
  }
};
