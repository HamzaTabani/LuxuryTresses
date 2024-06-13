import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {Alert} from 'react-native';

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
    if (currentUser) {
      const signInMethods = await auth().fetchSignInMethodsForEmail(
        currentUser.email,
      );
      // return console.log('signin methodsss', signInMethods)

      if (signInMethods.includes('facebook.com')) {
        // If the user is already signed in with facebook, link the google credential
        await currentUser.linkWithCredential(googleCredentials);
        console.log('Google account linked successfully.');
      } else {
        console.log('object');
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

    const currentUser = auth().currentUser;
    console.log('currentUser-=->', currentUser.providerData);
    if (currentUser) {
      try {
        const signInMethods = await auth().fetchSignInMethodsForEmail(
          currentUser.email,
        );
        console.log('Sign-in methods:', signInMethods);

        if (signInMethods.includes('google.com')) {
          // If the user is already signed in with Google, link the Facebook credential
          await currentUser.linkWithCredential(facebookCredential);
          console.log('Facebook account linked successfully.');
        } else {
          // If the user is not signed in with Google, sign them in with Facebook
          const userCredential = await firebase
            .auth()
            .signInWithCredential(facebookCredential);
          console.log('Signed A in with Facebook:', userCredential.user);
        }
      } catch (error) {
        // console.error('Error during Facebook account linking:', error);
        // Alert.alert('Error occurred while linking Facebook account.');
        // Inside the catch block for Error during Facebook account linking
        console.error('Error during Facebook account linking:', error);

        // Inside the catch block for Error during Facebook account linking
        if (error.code === 'auth/account-exists-with-different-credential') {
          // An account with the same email already exists, but with a different credential
          // Prompt the user to sign in with the provider associated with their existing account
          const providerId = 'google.com'; // Assuming the existing account was created using Google sign-in
          const provider = new firebase.auth.OAuthProvider(providerId);
          console.log('provider=-=>', provider);
          try {
            // Sign in with the provider associated with the existing account
            const result = await firebase.auth().signInWithPopup(provider);

            // Link the Facebook credential to the existing account
            await result.user.linkWithCredential(facebookCredential);
            console.log('Facebook account linked successfully.');
          } catch (linkingError) {
            console.error('Error linking Facebook account:', linkingError);
            Alert.alert('Error occurred while linking Facebook account.');
          }
        }
      }
    } else {
      try {
        // There is no current user, sign in with Facebook directly
        const userCredential = await firebase
          .auth()
          .signInWithCredential(facebookCredential);
        console.log('Signed B in with Facebook:', userCredential.user);

        // Check if the Facebook account's email is already associated with another provider
        const email = userCredential.user.email;
        const existingUser = await auth().fetchSignInMethodsForEmail(email);

        if (existingUser && existingUser.length > 0) {
          // If the email is associated with another provider, link the Facebook credential
          await userCredential.user.linkWithCredential(facebookCredential);
          console.log('Facebook account linked successfully.');
        }
      } catch (error) {
        console.error('Error occurred during Facebook login:', error);
        Alert.alert('Error occurred while signing in with Facebook.');
      }
    }
    console.log('User logged in with Facebook');
  } catch (error) {
    console.error('Facebook login error:', error);
    setLoader(false);
  }
};
