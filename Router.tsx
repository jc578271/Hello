import React, { memo } from "react";
import Home from "./src/screens/Home";
import Contact from "./src/screens/Contact";
import { NavigationContainer } from "@react-navigation/native"
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {createDrawerNavigator } from '@react-navigation/drawer'
import History from "./src/screens/History";
import Footer from "./src/components/Footer";
import Header from "./src/components/Header"
import { SafeAreaProvider } from "react-native-safe-area-context";
import SideNav from "./src/components/SideNav";
// const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const TabStack = ({ route, navigation }:any) => {
    return(
        <Tab.Navigator
        initialRouteName="Home"
            screenOptions={{header: props=><Header navigation={navigation} {...props} />}}
            tabBar={props=><Footer {...props} />}
        >
            <Tab.Screen name="Contact" component={Contact}/>
            <Tab.Screen name="History" component={History}/>
            
        </Tab.Navigator> 
    )
}

const Router = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{headerShown: false}}
                    drawerContent={props=><SideNav {...props} />}
                >
                    <Drawer.Screen options={{swipeEnabled: false}} name="Home" component={Home}/>
                    <Drawer.Screen name="DrawStack" component={TabStack} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default memo(Router)