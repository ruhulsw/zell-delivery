import { StyleSheet, TextInput, View } from "react-native";
import OneColList from "../common/components/OneColList";
import React, { useEffect, useState } from "react";
import { RISALES } from "../datas/Risales";
import { COLLECTIONS } from "../datas/Collections";
import { LIBRARIES } from "../datas/Libraries";
import { PRAYERS } from "../datas/Prayers";
import { FAMILY } from "../datas/Family";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);

  const mergeData = () => {
    setData([...RISALES, ...COLLECTIONS, ...LIBRARIES, ...PRAYERS, ...FAMILY]);
  };

  useEffect(() => {
    mergeData();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Kerko..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <OneColList data={searchResults} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333", // Input text color
    marginBottom: 16,
  },
});
