import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSavePage } from "../common/context/SavePageContext";
import React from "react";
import { Fontisto } from "@expo/vector-icons";

const HtmlViewHeader = ({ toggleMenu, currentPage, bookName, bookId }) => {
  const { savePage, removeSavedPage, savedPages } = useSavePage();

  const isPageSaved = () => {
    return savedPages.some(
      (page) =>
        page.fileName === bookName &&
        page.id === bookId &&
        page.partNumber === currentPage + 1
    );
  };

  const toggleSavePage = () => {
    const partNumber = currentPage + 1;

    if (isPageSaved()) {
      removeSavedPage(bookName, bookId, partNumber);
    } else {
      savePage(bookName, bookId, partNumber);
    }
  };

  return (
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
  );
};

export default HtmlViewHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#faf4e8",
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
