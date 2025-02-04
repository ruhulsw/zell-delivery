import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BookView from "../Screens/BookView";

const WrappedBookView = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BookView />
    </GestureHandlerRootView>
  );
};

export default WrappedBookView;
