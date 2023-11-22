import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const messageTemplate = [
  {text: 'Sed ut perspiciatis unde!', from: 'user'},
  {text: 'Hi there!', from: 'bot'},
  {text: 'How can I help you?', from: 'bot'},
];

const renderMessage = ({item}) => {
  const messageStyle =
    item.from === 'user' ? styles.userMessage : styles.otherMessage;
  const messageText =
    item.from === 'user' ? styles.userMessageText : styles.otherMessageText;
  return (
    <>
      <View style={[styles.messageContainer, messageStyle]}>
        <Text style={[messageText]}>{item.text}</Text>
      </View>
    </>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState(messageTemplate);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    alert('In progress');
    // setIsLoading(true);
    // setMessages(prev => {
    //   return [...prev, {text: newMessage, from: 'user'}];
    // });

    // try {

    //     setNewMessage('');
    //       setMessages(prev => {
    //         return [
    //           ...prev,
    //           {
    //             text: response?.data?.message?.text,
    //             from: 'bot',
    //           },
    //         ];
    //       });
    // } catch (error) {

    // }
  };

  return (
    <Container>
      <ProfileHeader icon={true} text={'Messages'} />

      <View style={styles.wrapper}>
        {/* chat user */}
        <View style={styles.chatHeader}>
          <View
            style={{
              width: 70,
              height: 70,
              position: 'relative',
            }}>
            <Image
              source={require('../../assets/images/chatuser.png')}
              resizeMode="cover"
              style={{width: '100%', height: '100%'}}
            />
            {/* online status button */}
            <View style={styles.onlineStatus}></View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <Text style={{color: '#fff', fontSize: hp('2.5%')}}>
              Omnis iste
            </Text>
            <Text
              style={{color: '#19CC89', fontSize: hp('1.7%'), marginTop: 2}}>
              Online
            </Text>
          </View>
        </View>
        {/* messages */}
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
          <FlatList
            data={messages.slice().reverse()}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index}
            contentContainerStyle={styles.messagesContainer}
            inverted
          />
        </View>

        {/* typing field... */}
        <View
          style={{
            height: 80,
            backgroundColor: '#D49621',
            width: '100%',
            flexDirection: 'row',
            padding: 10,
            borderRadius: 20,
          }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type message..."
              placeholderTextColor="#fff"
            />
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/send.png')}
                style={{width: 22, height: 22, marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Chat;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  chatHeader: {
    height: 80,
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D49621',
    padding: 3,
    flexDirection: 'row',
    gap: 15,
  },
  onlineStatus: {
    width: 13,
    height: 13,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#fff',
    backgroundColor: '#19CC89',
    position: 'absolute',
    bottom: 8,
    right: -5,
  },
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  messageContainer: {
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DBBE62',
    padding: 17,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#37354D',
    padding: 17,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
  },
  userMessageText: {
    color: '#000',
    fontSize: 12,
  },
  otherMessageText: {
    color: '#fff',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: '#fff',
    fontSize: 17,
  },
});
