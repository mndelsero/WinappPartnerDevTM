import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import tw from '@/config/tw';

const data = [
  { label: 'Ultimo 7 días', value: '0' },
  { label: 'Ultimo 30 días', value: '1' },
  { label: 'Ultimo 60 días', value: '2' },
  { label: 'Ultimo 90 días', value: '3' },
  { label: 'Ultimo 120 días', value: '4' },


];

const SelectDates = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const renderLabel = () => (
   <>
   </>
  );

  return (
   <View style={tw``}>
  {renderLabel()}
  <Dropdown
    style={[
      tw`h-10 w-full  rounded-2 px-2 text-xs bg-colorSelect `,
      isFocus && tw`border-primary`,
    ]}
    placeholderStyle={tw`text-xs md:text-lg`}
    selectedTextStyle={tw`text-xs md:text-lg`}
    inputSearchStyle={tw`h-8 text-xs md:text-lg`}
    iconStyle={tw`w-5 h-5`}
    data={data}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={!isFocus ? 'Fechas' : 'Fechas'}
    searchPlaceholder="Search..."
    value={value}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={item => {
      setValue(item.value);
      setIsFocus(false);
    }}
  />
</View>
  );
};

export default SelectDates;