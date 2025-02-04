import React, { useState, useEffect, useCallback, useRef } from 'react';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
} from 'react-native-reanimated';

import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Clipboard from 'expo-clipboard';
import { Share } from 'react-native';
import { Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextVerify from './ViewHelper/TextVerify';
import { injectedJavaScriptAndroid } from './ViewHelper/injectedJavaScript';
import EditModal from './ViewHelper/EditModal';
import TopMenu from '../Screens/TopMenu';
import HtmlViewHeader from '../Screens/HtmlViewHeader';

const HtmlViewer = ({ exampleText, bookName, bookId, BookInfo }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [bodyBackgroundColor, setBodyBackgroundColor] = useState('#fef9f4');
    const [showMenue, setShowMenue] = useState(false);
    const [highlightedTexts, setHighlightedTexts] = useState([]);
    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState({});
    const translateY = useSharedValue(-100);

    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(false);
    const [autoScrollSpeed, setAutoScrollSpeed] = useState(50);
    const webViewRef = useRef(null);

    useEffect(() => {
        let scrollInterval;

        if (isAutoScrollEnabled && webViewRef.current) {
            scrollInterval = setInterval(() => {
                const scrollScript = `
                  window.scrollBy(0, 10);
                  true;
              `;
                webViewRef.current.injectJavaScript(scrollScript);
            }, autoScrollSpeed);
        }

        return () => {
            if (scrollInterval) clearInterval(scrollInterval);
        };
    }, [isAutoScrollEnabled, autoScrollSpeed]);

    const menuAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const toggleMenu = () => {
        if (showMenue) {
            translateY.value = withTiming(-100, { duration: 300 });
            setTimeout(() => setShowMenue(false), 300);
        } else {
            setShowMenue(true);
            translateY.value = withTiming(0, { duration: 300 });
        }
    };

    useEffect(() => {
        const loadHighlightsAndNotes = async () => {
            try {
                const storedTexts =
                    await AsyncStorage.getItem('highlightedTexts');
                const storedNotes = await AsyncStorage.getItem('notes');
                const storedBgColor =
                    await AsyncStorage.getItem('backgroundColor');

                if (storedTexts) setHighlightedTexts(JSON.parse(storedTexts));
                if (storedNotes) setNotes(JSON.parse(storedNotes));
                if (storedBgColor) setBodyBackgroundColor(storedBgColor);
            } catch (error) {
                console.error(
                    'Failed to load highlights, notes, or background color',
                    error
                );
            }
        };

        loadHighlightsAndNotes();
    }, []);

    const saveBackgroundColor = async (color) => {
        try {
            await AsyncStorage.setItem('backgroundColor', color);
        } catch (error) {
            console.error('Failed to save background color', error);
        }
    };

    const changeBackgroundColor = (color) => {
        setBodyBackgroundColor(color);
        saveBackgroundColor(color);
    };

    const saveHighlights = async (highlightedTexts) => {
        try {
            await AsyncStorage.setItem(
                'highlightedTexts',
                JSON.stringify(highlightedTexts)
            );
        } catch (error) {
            console.error('Failed to save highlighted texts', error);
        }
    };

    const highlightText = (text, page) => {
        const existingIndex = highlightedTexts.findIndex(
            (t) => t.text === text
        );

        if (existingIndex !== -1) {
            const newTexts = highlightedTexts.filter(
                (_, index) => index !== existingIndex
            );
            setHighlightedTexts(newTexts);
            saveHighlights(newTexts);
        } else if (text) {
            const newTexts = [...highlightedTexts, { text, page }];
            setHighlightedTexts(newTexts);
            saveHighlights(newTexts);
        }
    };

    const saveNotes = async (notes) => {
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(notes));
        } catch (error) {
            console.error('Failed to save notes', error);
        }
    };

    const existingNoteIndex = notes.findIndex(
        (note) => note.text === currentNote.text
    );

    const existingNoteObject = notes.find(
        (note) => note.text === currentNote.text
    );

    const addNote = () => {
        if (existingNoteIndex !== -1) {
            const updatedNotes = [...notes];
            updatedNotes[existingNoteIndex] = {
                ...updatedNotes[existingNoteIndex],
                note: currentNote?.note,
            };

            setNotes(updatedNotes);
            saveNotes(updatedNotes);
        } else {
            const newNote = {
                text: currentNote?.text,
                note: currentNote?.note,
                page: currentNote?.page,
            };
            const updatedNotes = [...notes, newNote];
            setNotes(updatedNotes);
            saveNotes(updatedNotes);
        }

        setCurrentNote('');
        setModalVisible(false);
    };

    const deleteNote = useCallback(
        (text) => {
            const updatedNotes = notes.filter((note) => note.text !== text);
            setNotes(updatedNotes);
            saveNotes(updatedNotes);
            setModalVisible(false);
        },
        [notes, setNotes, saveNotes, setModalVisible]
    );

    const copyToClipboard = useCallback(async (text) => {
        try {
            await Clipboard.setStringAsync(text);
        } catch (error) {
            console.error('Error copying to clipboard', error);
        }
    }, []);

    const shareText = useCallback(async (text) => {
        try {
            await Share.share({ message: text });
        } catch (error) {
            console.error('Error sharing text', error);
        }
    }, []);

    const renderHTMLContent = () => {
        return `
          <html>
              <head>
                  <style>
                      /* Existing tooltip styles */
                      .tooltipTitle {
                          position: relative;
                          display: inline-block;
                          cursor: pointer;
                          font-size: 45px;
                          color: #c30f11;
                      }
  
                      .tooltipTitle .tooltip {
                          visibility: hidden;
                          max-width: 80vw; /* Prevent overflow */
                          background-color: #fff;
                          color: red;
                          text-align: center;
                          border: 1px solid red;
                          border-radius: 15px;
                          font-weight: 500;
                          padding: 10px 20px; /* Added left and right padding */
                          position: absolute; /* Absolute positioning */
                          bottom: 100%; /* Position above the text */
                          left: 50%;
                          transform: translateX(-50%) translateY(-10px); /* Center horizontally with slight upward offset */
                          opacity: 0;
                          transition: opacity 0.3s, transform 0.3s;
                          word-wrap: break-word;
                          box-sizing: border-box; /* Include padding in width calculations */
                          z-index: 999;
                          /* Added box-shadow for the shadow effect */
                          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                      }
  
                      .tooltipTitle .tooltip .tooltipContent {
                          display: block;
                          color: #000;
                          font-weight: 400;
                          font-size: 40px;
                      }
  
                      .tooltipTitle:hover .tooltip {
                          visibility: visible;
                          opacity: 1;
                          transform: translateX(-50%) translateY(0); /* Slide up into position */
                      }
  
                      /* Optional: Add a small arrow below the tooltip */
                      .tooltipTitle .tooltip::after {
                          content: "";
                          position: absolute;
                          top: 100%; /* At the bottom of the tooltip */
                          left: 50%;
                          transform: translateX(-50%);
                          border-width: 10px;
                          border-style: solid;
                          border-color: red transparent transparent transparent;
                      }
  
                      /* Prevent tooltip from exceeding viewport on the left */
                      .tooltipTitle.left .tooltip {
                          left: 10%;
                          transform: translateX(-10%) translateY(-10px);
                      }
  
                      .tooltipTitle.left:hover .tooltip {
                          transform: translateX(-10%) translateY(0);
                      }
  
                      /* Prevent tooltip from exceeding viewport on the right */
                      .tooltipTitle.right .tooltip {
                          left: 90%;
                          transform: translateX(-90%) translateY(-10px);
                      }
  
                      .tooltipTitle.right:hover .tooltip {
                          transform: translateX(-90%) translateY(0);
                      }
                  </style>
              </head>
  
              <body style="overscroll-behavior: contain; background-color: ${bodyBackgroundColor}; font-family: Arial, sans-serif; font-size: 40px; line-height: 1.4; padding: 20px;">
                  <div style="text-align: justify; padding: 10px;">
                      ${TextVerify({
                          page: exampleText,
                          highlightedTexts: {
                              text: highlightedTexts,
                              backgroundColor: '#ffcacc',
                              color: '#fff',
                          },
                          notes: notes,
                      })}
                  </div>
              </body>
          </html>
      `;
    };

    const onMessage = (event) => {
        try {
            const { action, text } = JSON.parse(event.nativeEvent.data);
            const page = exampleText?.page;

            switch (action) {
                case 'copy':
                    copyToClipboard(text);
                    break;
                case 'highlight':
                    highlightText(text, page);
                    break;
                case 'share':
                    shareText(text);
                    break;
                case 'audioPlay':
                    playAudio(text);
                    break;
                case 'note':
                    setCurrentNote({ text, page });
                    setModalVisible(true);
                    break;
                case 'touch':
                    setShowMenue(false);
                    break;
                default:
                    console.log('Unknown action:', action);
            }
        } catch (error) {
            console.error('Error in onMessage handler:', error);
        }
    };

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                {showMenue && (
                    <Animated.View
                        style={[styles.topMenuContainer, menuAnimatedStyle]}
                    >
                        <TopMenu />
                    </Animated.View>
                )}

                <HtmlViewHeader
                    toggleMenu={toggleMenu}
                    currentPage={exampleText.page}
                    bookName={bookName}
                    bookId={bookId}
                />

                <WebView
                    key={`${bodyBackgroundColor}-${currentPage}`}
                    ref={webViewRef}
                    originWhitelist={['*']}
                    source={{ html: renderHTMLContent() }}
                    injectedJavaScript={injectedJavaScriptAndroid}
                    onMessage={onMessage}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scrollEnabled={true}
                    nestedScrollEnabled
                    automaticallyAdjustContentInsets={false}
                />
                <EditModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    currentNote={currentNote}
                    setCurrentNote={setCurrentNote}
                    addNote={addNote}
                    deleteNote={deleteNote}
                    existingNoteObject={existingNoteObject}
                />
            </View>
        </Provider>
    );
};

export default HtmlViewer;

const styles = StyleSheet.create({
    topMenuContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#faf4e8',
        zIndex: 10,
        elevation: 5,
    },
});
