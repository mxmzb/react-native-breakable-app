import { StyleSheet, Dimensions, Platform } from "react-native";

export const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");

  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
};

export default StyleSheet.create({
  contentContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
