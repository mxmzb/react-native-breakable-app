import React from "react";
import { SENTRY_DSN } from "react-native-dotenv";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import * as Sentry from "@sentry/react-native";

import HomeScreen from "./src/Screens/Home";

if (SENTRY_DSN !== undefined) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: __DEV__ ? "development" : "production",
  });
}

console.disableYellowBox = true;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [isStackNavigatorActive, setIsStackNavigatorActive] = React.useState(false);

  const toggleStackNavigator = () => setIsStackNavigatorActive(!isStackNavigatorActive);

  if (!isStackNavigatorActive) {
    <HomeScreen toggleStackNavigator={toggleStackNavigator} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={() => {
            if (isStackNavigatorActive) {
              return (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    component={() => (
                      <HomeScreen
                        isStackNavigatorActive={isStackNavigatorActive}
                        toggleStackNavigator={toggleStackNavigator}
                      />
                    )}
                  />
                </Stack.Navigator>
              );
            }
            return (
              <HomeScreen
                isStackNavigatorActive={isStackNavigatorActive}
                toggleStackNavigator={toggleStackNavigator}
              />
            );
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
