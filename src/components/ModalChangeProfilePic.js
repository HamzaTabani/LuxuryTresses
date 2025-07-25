import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/Ionicons';
import FontAwesome1 from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';

const ModalChangeProfilePic = ({modalVisible, setModalVisible, source}) => {
  const [photoURL, setPhotoURL] = useState('');
  console.log('photoURL: ', photoURL);
  console.log('source-=-->', source);
  const onUploadPhoto = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.5,
      },
    };

    await launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('cancelled', response.didCancel);
      } else {
        setPhotoURL(response.assets[0].uri);
        console.log('response.assets[0].uri=-=>', response.assets[0].uri);
      }
    });
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <ScrollView contentContainerStyle={styles.centeredView}>
        <View style={styles.modalView}>
          {/* modal close button */}
          <Pressable
            style={styles.close_button}
            onPress={() => setModalVisible(!modalVisible)}>
            <FontAwesome5
              name="close"
              type="Ionicons"
              color="#D49621"
              size={30}
            />
          </Pressable>

          {/* modal title */}
          <View
            style={{
              width: '100%',
            }}>
            <Text style={styles.modalTitle}>Change Photo</Text>
          </View>

          {/* profile pic view */}
          <View style={styles.profilePicViewer}>
            <FastImage
              source={photoURL ? {uri: photoURL} : source}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.dp_img}
            />
          </View>

          {/* select from gallery.. */}
          <TouchableOpacity
            onPress={() => onUploadPhoto()}
            style={styles.select_from_gallery_button}>
            <View>
              <Text style={styles.select_from_gallery_text}>
                Select photo from gallery
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                backgroundColor: '#efefef',
                borderRadius: 50,
              }}>
              <FontAwesome1
                name="image"
                type="Ionicons"
                color="#D49621"
                size={15}
              />
            </View>
          </TouchableOpacity>
          {/* <View style={{width: '100%'}}>
            <Image
              source={{uri: photoURL}}
              resizeMode="contain"
              style={{height: '20%', width: '20%'}}
            />
          </View> */}

          {/* select from bottom images */}
          <View style={styles.select_from_images}>
            <Text style={styles.select_from_text}>Select</Text>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              <View style={styles.more_images_box}>
                <Image
                  source={require('../assets/images/pic1.png')}
                  style={styles.more_image}
                />
              </View>
              <View style={styles.more_images_box}>
                <Image
                  source={require('../assets/images/pic2.png')}
                  style={styles.more_image}
                />
              </View>
              <View style={styles.more_images_box}>
                <Image
                  source={require('../assets/images/pic3.png')}
                  style={styles.more_image}
                />
              </View>
              <View style={styles.more_images_box}>
                <Image
                  source={require('../assets/images/pic4.png')}
                  style={styles.more_image}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    position: 'relative',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  close_button: {
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 50,
    padding: 5,
    backgroundColor: '#111649',
    zIndex: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitle: {
    fontWeight: '400',
    fontSize: hp('2.5%'),
    color: '#000',
  },
  profilePicViewer: {
    height: hp('40'),
    width: hp('40'),
    borderWidth: 1,
    borderColor: '#D49621',
    borderRadius: 57,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    // backgroundColor:'red'
  },
  dp_img: {
    width: '100%',
    height: '100%',
    borderRadius: 57,
    // backgroundColor:'red'
  },
  select_from_gallery_button: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: '#D49621',
    borderRadius: 40,
    marginTop: 20,
  },
  select_from_gallery_text: {
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
    textTransform: 'uppercase',
    color: '#000',
    marginLeft: 15,
  },
  select_from_images: {
    width: '100%',
    borderTopWidth: 0.5,
    borderColor: 'gray',
    marginTop: 20,
  },
  select_from_text: {
    marginVertical: 10,
    fontWeight: '500',
    fontSize: hp('2%'),
    color: '#000',
  },
  more_images_box: {
    width: hp('11%'),
    height: hp('11%'),
    marginLeft: 10,
    borderRadius: 10,
  },
  more_image: {
    borderRadius: 20,
    width: hp('11%'),
    height: hp('11%'),
  },
});

export default ModalChangeProfilePic;
