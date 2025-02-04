import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { countries } from "countries-list";
import allTheCities from "all-the-cities";

const CountryCityModal = ({ visible, onClose, onSelection }) => {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  // Load countries dynamically from the `countries-list` package
  useEffect(() => {
    const countryArray = Object.keys(countries).map((code) => ({
      name: countries[code].name,
      code: code,
    }));
    setCountryList(countryArray);
  }, []);

  // Load cities for the selected country
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null); // Reset city when country changes

    // Filter cities based on the selected country
    const cities = allTheCities
      .filter((city) => city.country === country.code)
      .map((city) => city.name);
    setCityList(cities);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    onSelection({ country: selectedCountry.name, city });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Country and City</Text>

          {/* Country Selection */}
          <Text style={styles.label}>Select a Country:</Text>
          <FlatList
            data={countryList}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedCountry?.code === item.code && styles.selectedItem,
                ]}
                onPress={() => handleCountrySelect(item)}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          {/* City Selection */}
          {selectedCountry && (
            <>
              <Text style={styles.label}>
                Select a City in {selectedCountry.name}:
              </Text>
              <FlatList
                data={cityList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      selectedCity === item && styles.selectedItem,
                    ]}
                    onPress={() => handleCitySelect(item)}
                  >
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: "#e0f7fa",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CountryCityModal;
