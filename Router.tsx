// @ts-ignore
import React, {memo, useEffect} from "react";
import Home from "./src/screens/Home";
import Contact from "./src/screens/Contact";
import {getFocusedRouteNameFromRoute, NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
import History from "./src/screens/History";
import Footer from "./src/components/Footer";
import Header from "./src/components/Header"
import {SafeAreaProvider} from "react-native-safe-area-context";
import SideNav from "./src/components/SideNav";
import Collections from "./src/screens/Collections";
import AddEditContact from "./src/screens/AddEditContact";
import ItemContact from "./src/screens/ItemContact";
import {useAuth} from "./src/store";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const TabStack = ({ navigation }: any) => {
    return (
        <Tab.Navigator
            screenOptions={{ header: props => <Header navigation={navigation} {...props} /> }}
            tabBar={props => <Footer {...props} />}
        >
            <Tab.Screen name="Contact" component={Contact} />
            <Tab.Screen name="History" component={History} />
        </Tab.Navigator>
    )
}

const MainStack = () => {
    const auth = useAuth()
    useEffect(() => {
        console.log("auth:", auth)
    }, [auth])
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!auth?.userId ? <Stack.Screen name="Home" component={Home} />: null}
            <Stack.Group screenOptions={{presentation: "modal"}}>
                <Stack.Screen name="TabStack" component={TabStack} />
                <Stack.Screen name="AddContact" component={AddEditContact} />
            </Stack.Group>
            <Stack.Screen name="Collections" component={Collections} />
            <Stack.Screen name="ItemContact" component={ItemContact} />
            <Stack.Screen name="EditContact" component={AddEditContact} />
        </Stack.Navigator>
    )
}

const Router = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{ headerShown: false }}
                    drawerContent={props => <SideNav {...props} />}
                >
                    <Drawer.Screen options={({route}) => {
                        const routeName = getFocusedRouteNameFromRoute(route)
                        if (routeName != ("TabStack")) return {
                            swipeEnabled: false
                        }
                    }} name="MainStack" component={MainStack} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default memo(Router)