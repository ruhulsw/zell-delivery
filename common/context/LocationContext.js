import React, { createContext, useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import axios from "axios";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [ip, setIp] = useState(null);

  const fetchIpAddress = useCallback(async () => {
    try {
      const response = await axios.get("https://api64.ipify.org?format=json");
      if (response.data.ip) {
        setIp(response.data.ip);
        const locationResponse = await axios.get(
          `https://lo.ecomtechbd.com/location?ip=${response.data.ip}`
        );
        if (locationResponse.data) {
          setCity(locationResponse.data.city || "No City");
          setCountry(locationResponse.data.country || "No Country");
        }
      }
    } catch (error) {
      setErrorMsg("Failed to fetch IP address");
    }
  }, [ip]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        fetchIpAddress();
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        let address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (address && address.length > 0) {
          setCity(
            address[0].city ||
              address[0].subregion ||
              address[0].region ||
              "No City"
          );
          setCountry(address[0].country);
        }
      } catch (error) {
        setErrorMsg("Error fetching city");
      }
    })();
  }, [fetchIpAddress]);

  return (
    <LocationContext.Provider value={{ location, city, country, errorMsg }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
