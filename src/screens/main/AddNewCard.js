import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';
import colors from '../../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Add from 'react-native-vector-icons/Ionicons';
import PaymentCard from '../../components/PaymentCard';
import {useDispatch, useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import InputText from '../../components/InputText';
import PrimaryButton from '../../components/PrimaryButton';
import {createCard} from '../../redux/slices/AuthSlice';
import {ShowToast} from '../../utils';
import uuid from 'react-native-uuid';

const AddNewCard = () => {
  const [state, setState] = useState({
    card_id: '',
    card_holder: '',
    card_number: '',
    exp_year: '',
    exp_month: '',
    cvc: '',
  });

  const dispatch = useDispatch();

  const sheetRef = useRef();

  const {card} = useSelector(state => state.userData);

  console.log('cardcard-=-==>>>', (card[0].card_number).slice(0,1));

  console.log('card details ==========>', state.card_id);

  const onOpenSheet = () => {
    sheetRef.current.open();
    clearState();
  };

  const onTextChange = (value, text) => {
    setState({
      ...state,
      [value]: text,
    });
  };

  const clearState = () => {
    setState({
      ...state,
      card_id: '',
      card_holder: '',
      card_number: '',
      exp_month: '',
      exp_year: '',
      cvc: '',
    });
  };

  const onAddCard = () => {
    if (!state.card_holder) {
      return ShowToast('Please give your card details');
    } else if (state.card_number.length < 16) {
      return ShowToast('Please enter the valid card number');
    } else {
      const cardExist = card.find(item => item.card_id == state.card_id);
      if (cardExist) {
        // alert('or kesa hai');
        const updatedCard = card.map(item =>
          item.card_id === state.card_id ? {...state} : item,
        );
        dispatch(createCard(updatedCard));
        sheetRef.current.close();
        return ShowToast('Card has been updated successfully');
      } else {
        state.card_id = uuid.v4();
        const newCard = [...card, state];
        dispatch(createCard(newCard));
        sheetRef.current.close();
        clearState();
      }
    }
  };

  const onOpenCardDetails = card => {
    setState({
      ...state,
      card_id: card.card_id,
      card_holder: card.card_holder,
      card_number: card.card_number,
      cvc: card.cvc,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
    });
    sheetRef.current.open();
  };

  return (
    <Container>
      <ProfileHeader icon={true} username={true} text={'Add Card'} />
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        {card.length > 0 &&
          card.map((item, i) => (
            <View style={{marginBottom: hp('8%')}}>
              <PaymentCard
                cardholder_name={item.card_holder}
                card_number={item.card_number}
                date={item.exp_month + '/' + item.exp_year}
                cardStyle={{width: '100%'}}
                masterStyle={{width: '22%'}}
                onCardPress={() => onOpenCardDetails(item)}
              />
            </View>
          ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addCardButton}
        onPress={() => onOpenSheet()}>
        <Add name={'add'} color={colors.white} size={30} />
      </TouchableOpacity>
      <View style={styles.sheetWrapper}>
        <RBSheet
          ref={sheetRef}
          height={400}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: colors.primary,
              alignItems: 'center',
            },
          }}>
          <ScrollView contentContainerStyle={{paddingBottom: hp('10%')}}>
            <InputText
              label={'Card Holder'}
              placeholder={'Card Holder Name'}
              onChangeText={text => onTextChange('card_holder', text)}
              value={state.card_holder}
            />
            <InputText
              label={'Card Number'}
              placeholder={'Card Number'}
              length={16}
              onChangeText={text => onTextChange('card_number', text)}
              value={state.card_number}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 30,
              }}>
              <InputText
                style={styles.inputStyle}
                onChangeText={text => onTextChange('exp_year', text)}
                value={state.exp_year}
                length={2}
                innerStyle={styles.input}
                label={'Expiry Year'}
                placeholder={'Year'}
              />
              <InputText
                style={styles.inputStyle}
                innerStyle={styles.input}
                label={'Expiry Month'}
                length={2}
                onChangeText={text => onTextChange('exp_month', text)}
                value={state.exp_month}
                placeholder={'Month'}
              />
              <InputText
                style={styles.inputStyle}
                label={'Cvc'}
                onChangeText={text => onTextChange('cvc', text)}
                placeholder={'Cvc'}
                length={3}
                value={state.cvc}
                innerStyle={styles.input}
              />
            </View>
            <View style={{alignItems: 'center', paddingTop: hp('4%')}}>
              <PrimaryButton
                title={state.card_id == '' ? 'Add Card' : 'Update Card'}
                onPress={() => onAddCard()}
              />
            </View>
          </ScrollView>
        </RBSheet>
      </View>
    </Container>
  );
};

export default AddNewCard;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    paddingTop: hp('4%'),
  },
  addCardButton: {
    borderWidth: 1,
    backgroundColor: colors.secondary,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 60,
    right: 40,
    borderRadius: 100,
    height: hp('7%'),
    width: hp('7%'),
  },
  inputStyle: {
    width: hp('12%'),
  },
  input: {
    alignSelf: 'center',
  },
});
