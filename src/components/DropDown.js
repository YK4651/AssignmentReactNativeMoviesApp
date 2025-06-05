import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropDown({ selectedValue, onValueChange, options, label }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedValue);
  const [items, setItems] = useState(options);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (value !== selectedValue) {
      onValueChange(value);
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder="Select a category"
        zIndex={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    zIndex: 1000,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdown: {
    borderColor: '#ddd',
    height: 50,
    backgroundColor: '#fff',
    width: '50%',
    alignSelf: 'center',
  },
  dropdownContainer: {
    borderColor: '#ddd',
  },
});
