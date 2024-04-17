import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import images from '../assets/images';

const ProfileImgRound = ({imgSrc}) => {
  const navigation = useNavigation();

  const {user, pic_url} = useSelector(state => state.userData);
  // console.log('user.profile_pic0-0->', user.profile_pic);

  return (
    <TouchableOpacity
      disabled={true}
      onPress={() => navigation.navigate('profile')}
      style={{
        borderWidth: 2,
        borderColor: '#D49621',
        width: 60,
        height: 60,
        borderRadius: 50,
        position: 'relative',
        top: 'center',
        left: 'center',
        // backgroundColor: 'red',
      }}>
      <FastImage
        source={
          imgSrc
            ? require('../assets/images/profileimg.png')
            : user?.profile_pic
            ? {
                uri: user?.profile_pic,
                priority: FastImage.priority.normal,
              }
            : images.profile
        }
        resizeMode={FastImage.resizeMode.cover}
        style={{
          position: 'absolute',
          borderRadius: 100,
          top: 'center',
          left: 'center',
          width: 55,
          height: 55,
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileImgRound;
