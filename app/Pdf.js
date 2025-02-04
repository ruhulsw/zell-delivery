import {
  Alert,
  Dimensions,
  Share,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import { COLOR } from "../common/colors/color";

import Pdf from "react-native-pdf";
import { useRoute } from "@react-navigation/native";

const PdfScreen = () => {
  const route = useRoute();
  const [zoomLevel, setZoomLevel] = useState(1);

  const onShare = async (message) => {
    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const source = { uri: route.params.content.url, cache: true };
  console.log(source);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        enablePaging={true}
        scale={zoomLevel}
        minScale={1}
        maxScale={5}
        onLoadComplete={(numberOfPages, filePath) => {}}
        onPageChanged={(page, numberOfPages) => {}}
        horizontal={true}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <Text style={styles.zoomButtonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PdfScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width * 1.2, // Adjust width to extend closer to the sides
    height: Dimensions.get("window").height,
  },
  zoomControls: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
  },
  zoomButton: {
    backgroundColor: COLOR.primary,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginHorizontal: 10,
    elevation: 5,
  },
  zoomButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
