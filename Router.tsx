import React, { memo } from "react";
import Home from "./src/screens/Home";
import Contact from "./src/screens/Contact";
import { NavigationContainer } from "@react-navigation/native"
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import History from "./src/screens/History";
import Footer from "./src/components/Footer";
import Header from "./src/components/Header"
import { SafeAreaProvider } from "react-native-safe-area-context";
// const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
// const Drawer = createDrawerNavigator()

const Router = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Home"
                    tabBar={props=><Footer {...props} />}
                    screenOptions={{
                        header: props=><Header {...props} />
                    }}
                >
                    <Tab.Screen options={{headerShown: false}} name="Home" component={Home}/>
                    <Tab.Screen name="Contact" component={Contact}/>
                    <Tab.Screen name="History" component={History}/>
                    
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default memo(Router)