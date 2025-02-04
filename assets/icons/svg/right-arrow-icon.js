import Svg, {Path} from "react-native-svg";
import {COLOR} from "../../../common/colors/color";


export const RightArrowIcon = (props) => {
    return (
        <Svg {...props} viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><Path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill={COLOR.secondary} /></Svg>
    )
}