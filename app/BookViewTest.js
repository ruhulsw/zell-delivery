import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import {
  MaterialIcons,
  EvilIcons,
  Ionicons,
  SimpleLineIcons,
  Fontisto,
} from "@expo/vector-icons";
import axios from "axios";
import { useSavePage } from "../common/context/SavePageContext";

const BookView = () => {
  const navigation = useNavigation();
  const [textData, setTextData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fileName, setFileName] = useState("");
  const [BookId, setBookId] = useState();
  const [selectedText, setSelectedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { savePage, removeSavedPage, savedPages } = useSavePage();
  const flatListRef = useRef(null);

  const fetchTextData = async () => {
    try {
      console.log("BookView rendered");
      const response = await axios.post(
        `https://zell.ecomtechbd.com/get-single-book`,
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

  const handleTextPressOut = () => {
    setSelectedText("Selected text feature is not fully integrated.");
    setModalVisible(true);
  };

  const toggleSavePage = (index) => {
    const partNumber = index + 1;

    if (isPageSaved(index)) {
      removeSavedPage(fileName, BookId, partNumber);
    } else {
      savePage(fileName, BookId, partNumber);
    }
  };

  const isPageSaved = (index) => {
    return savedPages.some(
      (page) =>
        page.fileName === fileName &&
        page.id === BookId &&
        page.partNumber === index + 1
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visibleItemIndex = viewableItems[0].index;
      if (visibleItemIndex !== currentPage) {
        setCurrentPage(visibleItemIndex);
      }
    }
  }).current;

  const renderPage = ({ item, index }) => {
    const saved = isPageSaved(index);
    return (
      <View
        style={[
          styles.pageBox,
          saved && styles.savedPageBox, // Change background color if saved
        ]}
      >
        <Text
          style={styles.pageText}
          selectable={true}
          onPressOut={handleTextPressOut}
        >
          {item}
        </Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => toggleSavePage(index)}>
            <MaterialIcons
              name={saved ? "bookmark-border" : "bookmark-border"}
              size={24}
              color={saved ? "#007BFF" : "#333"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Note feature clicked")}>
            <SimpleLineIcons name="note" size={17} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Share feature clicked")}
          >
            <EvilIcons name="share-apple" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Palette feature clicked")}
          >
            <Ionicons name="color-palette-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.HeaderLeft} onPress={() => {}}>
          <Text style={styles.mainTitle}>Mektubat</Text>
          <Text style={styles.subTitle}>Üçüncü Mektup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.showMenue}
          onPress={() => navigation.navigate("(tabs)")}
        >
          <Text style={styles.showMenueTitle}>Araçlar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerRight}>
          <Fontisto name="bookmark-alt" size={26} color="#ccc" />
          <Text style={styles.pageNumber}>38</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={textData}
        renderItem={renderPage}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          waitForInteraction: true,
        }}
        initialScrollIndex={0}
        onScrollToIndexFailed={(info) => {
          flatListRef.current.scrollToIndex({
            index: info.index,
            animated: true,
          });
        }}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{selectedText}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf4e8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  showMenue: {
    flex: 1, // Takes up equal space in the row
    alignItems: "center", // Centers text horizontally
    justifyContent: "center", // Centers text vertically
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 60,
    paddingHorizontal: 6,
    paddingVertical: 5,
    backgroundColor: "#FDFCF8",
  },

  HeaderLeft: {
    flex: 1, // Ensures this section takes space without interfering with centering
  },

  showMenueTitle: {
    fontSize: 18,
    color: "#7c5a32", // Brown text color
    fontWeight: "bold",
    textAlign: "center", // Ensures proper alignment
  },

  headerRight: {
    flex: 1, // Ensures this section takes space without interfering with centering
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  pageNumber: {
    color: "#7c5a32",
    fontSize: 15,
  },

  pageBox: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  savedPageBox: {
    backgroundColor: "#DFF6DD", // Light green background for saved pages
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
    backgroundColor: "#f0f0f0",
    padding: 6,
    alignItems: "center",
  },
  pageText: {
    fontSize: 25,
    textAlign: "center",
    color: "#333",
    fontFamily: "SawarabiMincho",
    padding: 7,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
