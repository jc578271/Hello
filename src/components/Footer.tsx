// @ts-ignore
import React, { memo } from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { IC_ADDBTN, IMG_NAVBG, IC_LIST, IC_HISTORY } from "../assets";

const width = Dimensions.get('window').width

const labelIcons = {
    'Contact': [IC_LIST, 'Danh Bạ'],
    'History': [IC_HISTORY, 'Gần Đây']
}


const Footer = ({ state, descriptors, navigation }: any) => {
    const insets = useSafeAreaInsets()

    const itemRender = (title: string, index: number) => {
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
    }
    const contactRoute = state.routes[0]
    const historyRoute = state.routes[1]
    
    if (state.index < 3) {
        return (
            <>
            <Container>
                <WrapBtn>
                    <NavBg source={IMG_NAVBG} />
                    <AddBtn onPress={() => navigation.navigate('AddContact')}>
                        <AddImg resizeMode="contain" source={IC_ADDBTN} />
                    </AddBtn>
                </WrapBtn>
                {itemRender(descriptors[contactRoute.key].route.name, 0)}
                <Sth></Sth>
                {itemRender(descriptors[historyRoute.key].route.name, 1)}
            </Container>
            <View style={{
                backgroundColor: '#F2A54A',
                height: Platform.OS == "ios" ? insets.bottom + 10 : 10
            }}/>
            </>
        )
    } else {
        return null
    }
        
    
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
const NavBg = styled.Image`
    width: 100%;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
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