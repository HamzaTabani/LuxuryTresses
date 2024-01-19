import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileImgRound = ({ imgSrc }) => {
  const navigation = useNavigation();

  const { user, pic_url } = useSelector(state => state.userData)


  return (
    <TouchableOpacity
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
      }}>

      <Image
        borderRadius={100}
        source={
          imgSrc
            ? require('../assets/images/profileimg.png')
            :
            user ?
              { uri: pic_url + user?.profile_pic }
              : require('../assets/images/dp.png')
        }
        style={{
          position: 'absolute',
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
