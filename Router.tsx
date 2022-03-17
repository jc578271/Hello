import React from "react";
import Home from "./src/screens/Home";
import Contact from "./src/screens/Contact";
// import Layout from "./src/components/Layout";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import {  createDrawerNavigator} from '@react-navigation/drawer'
import History from "./src/screens/History";
import { View } from "react-native";
// import Footer from "./src/components/Footer";
const Stack = createNativeStackNavigator()
// const Tab = createBottomTabNavigator()
// const Drawer = createDrawerNavigator()

const Router = () => {
    

    return (
        <View>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="Home"
                    // tabBar={props=><Footer {...props} />}
                    
                >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Contact" component={Contact}/>
                    <Stack.Screen name="History" component={History}/>
                    
                </Stack.Navigator>
            </NavigationContainer>
        </View>
        
        
    )
}

export default Router