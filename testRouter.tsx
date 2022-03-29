import React, { memo } from "react";
import LoginScreen from "./src/screens/LoginScreen";
import ContactScreen from "./src/screens/ContactScreen";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HistoryScreen from "./src/screens/HistoryScreen";
import Footer from "./src/components/Footer";
import Header from "./src/components/Header"
import { SafeAreaProvider } from "react-native-safe-area-context";
import SideNav from "./src/components/SideNav";
import Collections from "./src/screens/Collections";
import AddEditContact from "./src/screens/AddEditContact";
import DetailContact from "./src/screens/DetailContact";
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const TabStack = ({ route, navigation }: any) => {
    return (
        <Tab.Navigator
            initialRouteName="ContactScreen"
            screenOptions={{ header: props => <Header navigation={navigation} {...props} /> }}
            tabBar={props => <Footer {...props} />}
        >
            <Tab.Screen name="ContactScreen" component={ContactScreen} />
            <Tab.Screen name="HistoryScreen" component={HistoryScreen} />
        </Tab.Navigator>
    )
}

const ContactStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, presentation: "modal" }}>
            <Stack.Screen name="TabStack" component={TabStack} />
            <Stack.Screen name="Collections" component={Collections} />
            <Stack.Screen name="AddContact" component={AddEditContact} />
        </Stack.Navigator>
    )
}
const OtherStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ContactStack" component={ContactStack} />
            <Stack.Screen name="Collections" component={Collections} />
            <Stack.Screen name="DetailContact" component={DetailContact} />
            <Stack.Screen name="EditContact" component={AddEditContact} />
        </Stack.Navigator>
    )
}

const Router = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="LoginScreen"
                    screenOptions={{ headerShown: false }}
                    drawerContent={props => <SideNav {...props} />}
                >
                    <Drawer.Screen options={{ swipeEnabled: false }} name="LoginScreen" component={LoginScreen} />
                    <Drawer.Screen name="DrawStack" component={OtherStack} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default memo(Router)