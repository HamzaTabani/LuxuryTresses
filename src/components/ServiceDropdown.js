import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';

const ServiceDropdown = ({services, serviceValue}) => {
  const [selectedService, setSelectedService] = useState({
    id: null,
    title: null,
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const items = Object.keys(services).flatMap(category => {
    const categoryLabel = {
      label: category,
      value: category,
      disabled: true,
    };
    const categoryServices = services[category].map(service => ({
      label: `     ${service.title}`,
      value: service.id,
    }));
    return [categoryLabel, ...categoryServices];
  });

  const selectValue = currentValue => {
    let chosenValue;
    if (typeof currentValue === 'function') {
      chosenValue = currentValue('');
    } else {
      chosenValue = currentValue;
    }

    if (chosenValue === value) {
      setValue('');
      serviceValue('');
    } else {
      setValue(currentValue);
    }
  };

  return (
    <View style={{marginBottom: 30, marginRight: hp(1.3)}}>
      <DropDownPicker
        onSelectItem={item => {
          // console.log('selcted item=-=-=>', item);
          serviceValue(item);
        }}
        labelStyle={{fontWeight: 'bold', color: colors.white}}
        itemSeparator={true}
        value={value}
        setValue={selectValue}
        schema={{
          label: 'label',
          value: 'value',
        }}
        items={items}
        defaultValue={selectedService.id}
        containerStyle={{
          height: hp(5),
          width: hp(46),
          alignSelf: 'center',
        }}
        style={{backgroundColor: '#D49621', zIndex: 3000}}
        listItemContainerStyle={{
          backgroundColor: '#D49621',
        }}
        listItemLabelStyle={{color: colors.white}}
        placeholder="Select a Service"
        placeholderStyle={{color: colors.white}}
        arrowIconStyle={{
          tintColor: colors.white,
        }}
        tickIconStyle={{
          tintColor: colors.white,
        }}
        setOpen={setOpen}
        open={open}
      />
    </View>
  );
};

export default ServiceDropdown;
