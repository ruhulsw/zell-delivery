import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Dimensions,
    PanResponder,
} from 'react-native';
import HtmlViewer from './HtmlViewer';

const { width, height } = Dimensions.get('window');

const GesturePage = ({
    swipeThreshold = 0.3,
    minScrollDistance = 5,
    SavePage,
    BookInfo,
    Book,
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const position = useRef(0);
    const totalPages = Book.data.length;
    const [setedPage, setPageNumber] = useState(1);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (_, gestureState) => {
                const { dx, dy } = gestureState;
                return Math.abs(dx) > Math.abs(dy);
            },
            onMoveShouldSetPanResponder: (_, gestureState) => {
                const { dx, dy } = gestureState;
                const isHorizontalGesture =
                    Math.abs(dx) > Math.abs(dy) &&
                    Math.abs(dx) > minScrollDistance;
                return isHorizontalGesture;
            },
            onPanResponderMove: (_, gestureState) => {
                const { dx } = gestureState;
                if (Math.abs(dx) > Math.abs(gestureState.dy)) {
                    const offset = -dx / width;
                    animatedValue.setValue(position.current + offset);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                const { dx, vx } = gestureState;

                if (dx < -width * swipeThreshold || vx < -0.5) {
                    if (position.current < totalPages - 1) {
                        position.current += 1;
                    }
                } else if (dx > width * swipeThreshold || vx > 0.5) {
                    if (position.current > 0) {
                        position.current -= 1;
                    }
                }

                Animated.spring(animatedValue, {
                    toValue: position.current,
                    useNativeDriver: true,
                }).start();
            },
        })
    ).current;

    const renderPage = (pageIndex) => {
        const translateX = animatedValue.interpolate({
            inputRange: [pageIndex - 1, pageIndex, pageIndex + 1],
            outputRange: [width, 0, -width],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View
                key={pageIndex}
                style={[
                    styles.page,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <HtmlViewer
                    exampleText={Book.data[pageIndex]}
                    bookName={Book.bookName}
                    bookId={Book.bookId}
                />
            </Animated.View>
        );
    };

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            {Book.data.map((_, i) => renderPage(i))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    page: {
        position: 'absolute',
        width,
        height,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
});

export default GesturePage;
