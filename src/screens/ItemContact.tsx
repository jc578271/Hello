import React, { memo } from "react";
import { Platform, StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

const ItemContact = () => {
    const insets = useSafeAreaInsets()
    return (
        <>
        <View style={{
            backgroundColor: "#FFFFFF",
            height: Platform.OS == "ios" ? insets.top : StatusBar.currentHeight,
        }}></View>
        <Container>
            <Text>ItemCOntact</Text>
        </Container>
        </>
        
    )
}

export default memo(ItemContact)

const Container = styled.View`
    background-color: #FFFFFF
    display: flex
`
const Section1 = styled.View`

`
const HeaderSection = styled.View`

`
const BackBtn = styled.TouchableOpacity`

`
const BackIc = styled.Image`

`
const EditBtn = styled.View`

`
const EditText = styled.Text`

`
const InfoSection = styled.View`

`
const ProfileImgSection = styled.View`

`
const ProfileImg = styled.Image`

`
const CamIcon = styled.Image`

`
const NameText = styled.Text`

`
const SubText = styled.Text`

`

