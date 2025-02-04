import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import axios from "axios";
import TopMenu from "./TopMenu";
import { useSavePage } from "../common/context/SavePageContext";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const BookView = () => {
  const [textData, setTextData] = useState([]); // Stores book content
  const [currentPage, setCurrentPage] = useState(0); // Tracks the current page
  const [fileName, setFileName] = useState(""); // File name for the book
  const [BookId, setBookId] = useState(); // Book ID
  const [showMenue, setShowMenue] = useState(false); // Show or hide the menu

  const translateY = useSharedValue(-100); // Initial position for TopMenu animation
  const translateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const { savePage, removeSavedPage, savedPages } = useSavePage();

  const fetchTextData = async () => {
    try {
      const response = await axios.post(
        "https://zell.ecomtechbd.com/get-single-book",
        { id: 1 }
      );
      setFileName(response.data.fileName);
      setBookId(response.data.id);
      setTextData(response.data.parts || []);
    } catch (error) {
      console.error("Error fetching text data:", error.message);
    }
  };

  useEffect(() => {
    fetchTextData();
  }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      rotateY.value = event.translationX / 10; // Create curl effect
    },
    onEnd: () => {
      if (translateX.value < -100 && currentPage < textData.length - 1) {
        translateX.value = withTiming(-300, { duration: 300 });
        rotateY.value = withTiming(-10, { duration: 300 }, () => {
          translateX.value = withTiming(0);
          rotateY.value = withTiming(0);
          runOnJS(setCurrentPage)(currentPage + 1);
        });
      } else if (translateX.value > 100 && currentPage > 0) {
        translateX.value = withTiming(300, { duration: 300 });
        rotateY.value = withTiming(10, { duration: 300 }, () => {
          translateX.value = withTiming(0);
          rotateY.value = withTiming(0);
          runOnJS(setCurrentPage)(currentPage - 1);
        });
      } else {
        translateX.value = withTiming(0);
        rotateY.value = withTiming(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  const menuAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const toggleMenu = () => {
    if (showMenue) {
      translateY.value = withTiming(-100, { duration: 300 });
      setTimeout(() => setShowMenue(false), 300); // Delayed state change to wait for animation
    } else {
      setShowMenue(true);
      translateY.value = withTiming(0, { duration: 300 });
    }
  };

  const toggleSavePage = () => {
    const partNumber = currentPage + 1;

    if (isPageSaved()) {
      removeSavedPage(fileName, BookId, partNumber);
    } else {
      savePage(fileName, BookId, partNumber);
    }
  };

  const isPageSaved = () => {
    return savedPages.some(
      (page) =>
        page.fileName === fileName &&
        page.id === BookId &&
        page.partNumber === currentPage + 1
    );
  };

  if (textData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => setShowMenue(false)}>
      <KeyboardAvoidingView style={styles.container}>
        {showMenue && (
          <Animated.View style={[styles.topMenuContainer, menuAnimatedStyle]}>
            <TopMenu />
          </Animated.View>
        )}
        <View style={styles.header}>
          <TouchableOpacity style={styles.HeaderLeft} onPress={() => {}}>
            <Text style={styles.mainTitle}>Mektubat</Text>
            <Text style={styles.subTitle}>Üçüncü Mektup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.showMenue} onPress={toggleMenu}>
            <Text style={styles.showMenueTitle}>Araçlar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerRight}>
            <Fontisto
              name="bookmark-alt"
              size={26}
              color={isPageSaved() ? "red" : "#ccc"}
              onPress={toggleSavePage}
            />
            <Text style={styles.pageNumber}>{currentPage + 1}</Text>
          </TouchableOpacity>
        </View>

        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[styles.pageContainer, animatedStyle, styles.shadow]}
          >
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.pageText} selectable={false}>
                {textData[currentPage]}
              </Text>
            </ScrollView>
          </Animated.View>
        </PanGestureHandler>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default BookView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf4e8",
    fontFamily: "SawarabiMincho",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  showMenue: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#faf4e8",
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    backgroundColor: "#faf4e8",
    height: 45,
    marginTop: -36,
    shadowColor: "#7c5a32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  topMenuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#faf4e8",
    zIndex: 10,
    elevation: 5,
  },
  HeaderLeft: {
    flex: 1,
  },
  showMenueTitle: {
    fontSize: 18,
    color: "#7c5a32",
    fontWeight: "bold",
    textAlign: "center",
  },
  headerRight: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  pageNumber: {
    color: "#7c5a32",
    fontSize: 15,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8F6A46",
  },
  subTitle: {
    fontSize: 16,
    color: "#7c5a32",
  },
  pageContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#faf4e8",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pageText: {
    fontSize: 25,
    textAlign: "center",
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
