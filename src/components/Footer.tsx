// @ts-ignore
import React, {memo, useCallback, useEffect, useState} from "react";
import {BackHandler, Keyboard, Platform, ToastAndroid} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styled from "styled-components/native";
import {IC_ADDBTN, IC_HISTORY, IC_LIST, IMG_NAVBG} from "../assets";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";

const labelIcons = {
    'ContactScreen': [IC_LIST, 'Danh Bạ'],
    'HistoryScreen': [IC_HISTORY, 'Gần Đây']
}

const Footer = ({ state, descriptors, navigation, tabRoute, mainRoute }: any) => {
    const insets = useSafeAreaInsets()
    const [isShown, setShown] = useState(false)
    const [exitApp, setExitApp] = useState(0)
    useEffect(() => {
        const keyboardShow = Keyboard.addListener('keyboardDidShow', () => setShown(true))
        const keyboardHide = Keyboard.addListener('keyboardDidHide', () => setShown(false))

        let mainRouteName = getFocusedRouteNameFromRoute(mainRoute) || "TabStack"
        let tabRouteName = getFocusedRouteNameFromRoute(tabRoute) || "ContactScreen"
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (Platform.OS != "ios" && mainRouteName == "TabStack" && tabRouteName == "ContactScreen") {
                setTimeout(() => setExitApp(0), 2000)
                if (exitApp == 0) {
                    setExitApp(prev=>prev+1)
                    ToastAndroid.show("tab back again to exit", ToastAndroid.SHORT)
                } else if (exitApp==1) {
                    BackHandler.exitApp()
                }
                return true
            }
        })

        return () => {
            backHandler.remove()
            keyboardShow.remove()
            keyboardHide.remove()
        }
    }, [exitApp, tabRoute, mainRoute])

    const itemRender = useCallback((title: string, index: number) => {
        const isFocused = state.index == index
        return (
            <WrapItem>
                <ItemBtn onPress={() => navigation.navigate(title)}>
                    <ItemImg
                        isFocused={isFocused}
                        resizeMode="cover" source={labelIcons[title][0]}
                    />
                    <ItemText isFocused={isFocused}>
                        {labelIcons[title][1]}
                    </ItemText>
                </ItemBtn>
            </WrapItem>
        )
    }, [state.index])

    const contactRoute = state.routes[0]
    const historyRoute = state.routes[1]

    return (!isShown || Platform.OS == "ios") && (
        <>
        <Container>
            <WrapBtn>
                <NavBgSection>
                    <BgSth/>
                    <NavBg source={IMG_NAVBG} />
                    <BgSth/>
                </NavBgSection>

                <AddBtn onPress={() => navigation.navigate('AddContact')}>
                    <AddImg resizeMode="contain" source={IC_ADDBTN} />
                </AddBtn>
            </WrapBtn>
            {itemRender(descriptors[contactRoute.key].route.name, 0)}
            <Sth/>
            {itemRender(descriptors[historyRoute.key].route.name, 1)}
        </Container>
        <FooterSection height={Platform.OS == "ios" ? insets.bottom + 10 : 10}/>
        </>
    )
        
    
}

export default memo(Footer)

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    height: 0;
`
const WrapItem = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    justify-self: end;
    height: 55px;
`
const ItemBtn = styled.TouchableOpacity`
    display: flex;
    align-self: center;
    justify-content: center;
`

const WrapBtn = styled.View`
    position: absolute;
    left:0;
    right: 0;
    top: -100px;
    bottom: 0;
    display: flex;
`
const Sth = styled.View`
    width: 85px;
`
const AddBtn = styled.TouchableOpacity`
    width: 85px;
    height: 85px;
    align-self: center;
`
const AddImg = styled.Image`
    align-self: center;
    width: 100%;
    height: 100%;
`
const NavBgSection = styled.View`
  position: absolute;
  flex-direction: row;
  right: 0;
  left: 0;
  bottom: 0;
`
const BgSth = styled.View`
  flex: auto;
  background-color: #F2A54A;
`
const NavBg = styled.Image`
    width: 135px;
    height: 56px;
`
const ItemImg = styled.Image<{isFocused?:boolean}>`
    width: 30px;
    height: 30px;
    margin: auto;
    tint-color:${props => props.isFocused ? 'white' : '#DADADA'};
`
const ItemText = styled.Text<{isFocused?:boolean}>`
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    margin-top: 4px;
    color: ${props => props.isFocused ? 'white' : '#DADADA'};
`

export const FooterSection = styled.View<{height?:string|number}>`
  background-color: #F2A54A;
  height: ${props => props.height}px;
`