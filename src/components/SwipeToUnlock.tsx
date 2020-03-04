import React from "react";
import styled from "styled-components";
import { Animated, UIManager, Easing } from "react-native";
import { PanGestureHandler, State, gestureHandlerRootHOC } from "react-native-gesture-handler";

// Enable LayoutAnimation on Android
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BUTTON_SIZE = 50;
const BUTTON_PAD = 3;

const Container = styled(Animated.View)`
  position: relative;
  width: 100%;
  height: ${BUTTON_SIZE};
  background-color: blue;
  border-radius: ${BUTTON_SIZE / 2};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ButtonContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: ${BUTTON_SIZE};
  height: ${BUTTON_SIZE};
  border-top-right-radius: ${BUTTON_SIZE / 2};
  border-bottom-right-radius: ${BUTTON_SIZE / 2};
  z-index: 2;
`;

const Button = styled.View`
  position: absolute;
  top: ${BUTTON_PAD};
  right: ${BUTTON_PAD};
  width: ${BUTTON_SIZE - BUTTON_PAD * 2};
  height: ${BUTTON_SIZE - BUTTON_PAD * 2};
  border-radius: ${BUTTON_SIZE / 2};
  background: #fff;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Label = styled(Animated.Text)`
  position: relative;
  color: #000;
  z-index: 0;
`;

const SwipeToUnlock = ({ onUnlock = () => {} }) => {
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [translateX] = React.useState(new Animated.Value(0));
  const [progress] = React.useState(new Animated.Value(0));
  const [isUnlocked, setIsUnlocked] = React.useState(false);

  const _onPanGestureEvent = event => {
    if (!isUnlocked) {
      translateX.setValue(
        Math.max(0, Math.min(event.nativeEvent.translationX, containerWidth - BUTTON_SIZE)),
      );
      progress.setValue(
        Math.max(
          0,
          Math.min(event.nativeEvent.translationX, containerWidth - BUTTON_SIZE) /
            (containerWidth - BUTTON_SIZE),
        ),
      );
    }
  };

  return (
    <Container onLayout={event => setContainerWidth(event.nativeEvent.layout.width)}>
      <PanGestureHandler
        onGestureEvent={_onPanGestureEvent}
        onHandlerStateChange={({ nativeEvent }) => {
          if (
            nativeEvent.state === State.END &&
            nativeEvent.translationX >= containerWidth - BUTTON_SIZE
          ) {
            setIsUnlocked(true);
            onUnlock();
          }

          if (
            !isUnlocked &&
            nativeEvent.state === State.END &&
            nativeEvent.translationX < containerWidth - BUTTON_SIZE
          ) {
            Animated.timing(translateX, {
              toValue: 0,
              duration: 200,
              easing: Easing.ease,
            }).start();
            Animated.timing(progress, {
              toValue: 0,
              duration: 200,
              easing: Easing.ease,
            }).start();
          }
        }}
      >
        <ButtonContainer style={{ transform: [{ translateX }] }}>
          <Button></Button>
        </ButtonContainer>
      </PanGestureHandler>
      <Label
        style={{
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}
      >
        Slide to confirm
      </Label>
    </Container>
  );
};

export default gestureHandlerRootHOC(SwipeToUnlock);
// export default SwipeToUnlock;
