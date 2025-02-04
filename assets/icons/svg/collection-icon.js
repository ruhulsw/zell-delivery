import Svg, {Path} from "react-native-svg";
import {COLOR} from "../../../common/colors/color";


export const CollectionIcon = (props) => {
    return (
        <Svg {...props} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <Path fill={COLOR.secondary}
                  d="M256 128v698.88l196.032-156.864a96 96 0 0 1 119.936 0L768 826.816V128H256zm-32-64h576a32 32 0 0 1 32 32v797.44a32 32 0 0 1-51.968 24.96L531.968 720a32 32 0 0 0-39.936 0L243.968 918.4A32 32 0 0 1 192 893.44V96a32 32 0 0 1 32-32z"/>
        </Svg>
    )
}