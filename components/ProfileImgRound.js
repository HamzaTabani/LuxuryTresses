import {TouchableOpacity, Image} from 'react-native';

const ProfileImgRound = ({imgSrc}) => {
  return (
    <TouchableOpacity
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
        source={
          imgSrc
            ? require('../assets/images/profileimg.png')
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
