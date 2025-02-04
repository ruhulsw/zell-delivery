import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavePageContext = createContext();

export const SavePageProvider = ({ children }) => {
  const [savedPages, setSavedPages] = useState([]);

  useEffect(() => {
    const loadSavedPages = async () => {
      try {
        const storedPages = await AsyncStorage.getItem("savedPages");
        if (storedPages) {
          setSavedPages(JSON.parse(storedPages));
        }
      } catch (error) {
        console.log("Error loading saved pages:", error);
      }
    };
    loadSavedPages();
  }, []);

  useEffect(() => {
    const saveToAsyncStorage = async () => {
      try {
        await AsyncStorage.setItem("savedPages", JSON.stringify(savedPages));
      } catch (error) {
        console.error("Error saving pages to AsyncStorage:", error);
      }
    };
    saveToAsyncStorage();
  }, [savedPages]);

  const savePage = (fileName, id, partNumber) => {
    const pageData = { fileName, id, partNumber };
    setSavedPages((prev) => [...prev, pageData]);
  };

  const removeSavedPage = (fileName, id, partNumber) => {
    setSavedPages((prev) =>
      prev.filter(
        (page) =>
          page.fileName !== fileName ||
          page.id !== id ||
          page.partNumber !== partNumber
      )
    );
  };

  const getPagesByFileNameOrId = (fileName, id) => {
    return savedPages.filter(
      (page) => page.fileName === fileName || page.id === id
    );
  };

  return (
    <SavePageContext.Provider
      value={{ savedPages, savePage, removeSavedPage, getPagesByFileNameOrId }}
    >
      {children}
    </SavePageContext.Provider>
  );
};

export const useSavePage = () => {
  return useContext(SavePageContext);
};
