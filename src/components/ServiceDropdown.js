import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ServiceDropdown = ({services, serviceValue}) => {
  const [selectedService, setSelectedService] = useState({
    id: null,
    title: null,
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  //   const [itemId,]

  //   const handleServiceChange = (serviceId, serviceTitle) => {
  //     console.log('vfvfd', serviceId, serviceTitle);
  //     setSelectedService({id: serviceId, title: serviceTitle});
  //   };

  useEffect(() => {
    console.log('value', value);
    serviceValue(value);
  }, [value]);

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

  return (
    <View style={{marginBottom: 30}}>
      <DropDownPicker
        // itemSeparatorStyle={{borderWidth: 2, borderColor: colors.black,backgroundColor:'red'}}
        // textStyle={{fontWeight:'bold'}}
        labelStyle={{fontWeight: 'bold'}}
        itemSeparator={true}
        // itemSeparatorStyle={{borderColor:colors.orange}}
        // dropDownContainerStyle={{borderColor: colors.orange}}
        value={value}
        setValue={setValue}
        schema={{
          label: 'label',
          value: 'value',
        }}
        items={items}
        defaultValue={selectedService.id}
        containerStyle={{height: hp(5), width: hp(46), alignSelf: 'center'}}
        placeholder="Select a Service"
        // onChangeValue={item => {
        //   console.log('9878', item);
        // //   handleServiceChange(item.value, item.label.trim());
        // //   setOpen(false); // Close the dropdown after selection
        // }}
        setOpen={setOpen}
        open={open}
      />
      {/* {selectedService.id !== null && (
        <Text style={{color: colors.white, backgroundColor: 'red'}}>
          Selected Service: {selectedService.title}, ID: {selectedService.id}
        </Text>
      )} */}
    </View>
  );
};

export default ServiceDropdown;
