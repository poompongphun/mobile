import { StatusBar } from "expo-status-bar";
import { StyleSheet, PanResponder, View, Animated } from "react-native";
import { useRef } from "react";

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({ x: pan.x._value, y: pan.y._value });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: (evt, gestureState) => {
      pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      });
      const touches = evt.nativeEvent.touches;
      if (touches.length >= 2) {
        scale.setValue(
          0.15 *
            Math.sqrt(
              Math.abs(touches[0].locationX - touches[1].locationX) +
                Math.abs(touches[0].locationY - touches[1].locationY)
            ) -
            .5
        );
      }
    },
    onPanResponderRelease: () => {
      pan.flattenOffset();
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: false,
      }).start();
    },
  });
  return (
    <View style={styles.container}>
      <Animated.Image
        {...panResponder.panHandlers}
        style={[
          {
            width: 150,
            height: 150,
            objectFit: "contain",
            transform: [{ scale: scale }],
          },
          pan.getLayout(),
        ]}
        source={require("./assets/IT_Logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
