import {StyleSheet, Text} from "react-native";

 const MyText = ({styles, children, ...other}) => {
    return (
        <Text styles={[style.text, styles]} {...other}>{children}</Text>
    )
}

const style = StyleSheet.create({
    text: {
        // fontFamily: 'PoppinsRegular'
    }
})
export default MyText;
