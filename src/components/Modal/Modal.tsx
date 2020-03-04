import React from "react";
import ReactNativeModal from "react-native-modal";
import styled from "styled-components";
import { useSafeArea } from "react-native-safe-area-context";

import style from "./style";

const Touchable = styled.TouchableWithoutFeedback``;

const Container = styled.View`
  position: relative;
  z-index: 999999;
  background: #fff;
`;

const CloseHandler = styled.View`
  position: absolute;
  top: ${20 - 13};
  right: 20;
`;

const Inner = styled.View`
  padding-left: 20;
  padding-right: 20;
`;

const Close = styled.Text.attrs({
  children: "x",
})`
  color: #fff;
  font-size: 26;
  width: 18;
  height: 23;
`;

const NativeModalIOS = ({
  children,
  isVisible,
  mode,
  onConfirm,
  onCancel,
  titleIOS,
  confirmTextIOS,
  cancelTextIOS,
  neverDisableConfirmIOS,
  contentContainerStyleIOS,
  customTitleContainerIOS,
  datePickerContainerStyleIOS,
  reactNativeModalPropsIOS,
  titleStyle,
  confirmTextStyle,
  cancelTextStyle,
  userIsInteractingWithPicker,
  onBackdropPress,
  ...otherProps
}) => {
  const insets = useSafeArea();

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={[style.contentContainer, contentContainerStyleIOS]}
      backdropOpacity={0.5}
      avoidKeyboard
      onBackdropPress={onBackdropPress}
      {...reactNativeModalPropsIOS}
      {...otherProps}
    >
      <Container>
        <CloseHandler>
          <Touchable onPress={onBackdropPress}>
            <Close />
          </Touchable>
        </CloseHandler>

        <Inner>{children}</Inner>
      </Container>
    </ReactNativeModal>
  );
};

NativeModalIOS.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
};

export default NativeModalIOS;
