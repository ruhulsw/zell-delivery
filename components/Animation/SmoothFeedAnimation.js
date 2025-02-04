// import React from 'react';
// import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

// const SmoothFeedAnimation = ({ children }) => {
//     return (
//         <Animated.View
//             entering={FadeIn.duration(100)}
//             exiting={FadeOut.duration(100)}
//             style={{ flex: 1 }}
//         >
//             {children}
//         </Animated.View>
//     );
// };

// export default SmoothFeedAnimation;

import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const SmoothFeedAnimation = ({ children }) => {
    return <>{children}</>;
};

export default SmoothFeedAnimation;
