import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const MenuIcon = (props) => {
    return (
        <Svg
            width={props.style.width || 24}
            height={props.style.height || 24}
            viewBox="0 0 24 24"
            fill={props.style.fill || 'none'} // Apply the fill color directly
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M4 6h16M4 12h16M4 18h16"
                stroke={props.style.fill || 'black'} // Also apply stroke for backward compatibility
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
