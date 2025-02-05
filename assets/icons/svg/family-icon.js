import Svg, {G, Path} from "react-native-svg";
import {COLOR} from "../../../common/colors/color";


export const FamilyIcon = (props) => {
    return (
        <Svg fill={COLOR.secondary} {...props} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <G id="mail">
                <Path d="M35.71,22.29,31,17.59V10a1,1,0,0,0-1-1H26a1,1,0,0,0-1,1v1.59L20.71,7.29a1,1,0,0,0-1.41,0l-15,15A1,1,0,0,0,5,24H9a1,1,0,0,0,.71-.29l.29-.29V34a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V23.41l.29.29A1,1,0,0,0,31,24h4a1,1,0,0,0,.71-1.71ZM27,11h2v4.59l-2-2ZM22,33V26h2v7Zm6,0H26V25a1,1,0,0,0-1-1H21a1,1,0,0,0-1,1v8H12V21.41l8-8,8,8Zm3.41-11-1.71-1.71-9-9a1,1,0,0,0-1.41,0l-9,9L8.59,22H7.41L20,9.41l5.29,5.29,4,4L32.59,22ZM18,24H14a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V25A1,1,0,0,0,18,24Zm-1,4H15V26h2Z"/>
            </G>
        </Svg>
    )
}