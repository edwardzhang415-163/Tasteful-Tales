import { TouchableOpacity, TextInput, View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function FeedSearchBar({ onBlur }) {
  const [searchText, setSearchText] = useState('');

  const onChangeText = (text) => {
    setSearchText(text);
  }

  const onClear = () => {
    setSearchText('');
  }

  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts by title..."
        value={searchText}
        onChangeText={onChangeText}
        onBlur={() => onBlur(searchText)}
        placeholderTextColor="#666"
        autoFocus={true}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    marginBottom: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  clearButton: {
    padding: 5,
  }
})