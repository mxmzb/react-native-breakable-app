import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Modal,
} from "react-native";

import { Header, Colors } from "react-native/Libraries/NewAppScreen";
import SwipeToUnlock from "../components/SwipeToUnlock";

const HomeScreen = ({ toggleStackNavigator, isStackNavigatorActive }) => {
  const [showModal, setShowModal] = React.useState(false);

  const crashMe = () => {
    throw Error("Whoops!");
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={[styles.body, { justifyContent: "center", alignItems: "center" }]}>
            <TouchableHighlight onPress={crashMe}>
              <View style={{ backgroundColor: "red", padding: 10 }}>
                <Text>Crash me!</Text>
              </View>
            </TouchableHighlight>
            <View style={[styles.separator]}></View>
            <TouchableHighlight onPress={toggleModal}>
              <View style={{ backgroundColor: "grey", padding: 10 }}>
                <Text>Open modal!</Text>
              </View>
            </TouchableHighlight>
            <View style={[styles.separator]}></View>
            <TouchableHighlight onPress={toggleStackNavigator}>
              <View style={{ backgroundColor: "grey", padding: 10 }}>
                <Text>Toggle Stack Navigator!</Text>
              </View>
            </TouchableHighlight>
            <View style={[styles.separator]}></View>
            <Text>Currently using Stack Navigator: {isStackNavigatorActive ? "Yes" : "No"}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal animationType="slide" presentationStyle="formSheet" visible={showModal}>
        <View style={[styles.body, { justifyContent: "center", alignItems: "center" }]}>
          <View style={{ width: "100%", height: 70 }}>
            <SwipeToUnlock />
          </View>
          <View style={[styles.separator]}></View>
          <TouchableHighlight onPress={toggleModal}>
            <View style={{ backgroundColor: "grey", padding: 10 }}>
              <Text>Close modal!</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    padding: 15,
    backgroundColor: Colors.white,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
  separator: {
    height: 10,
  },
});

export default HomeScreen;
