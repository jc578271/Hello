import React, { memo } from "react";
import styled from "styled-components/native";
import Footer from "./Footer";
import Header from "./Header";
import GestureRecognizer from 'react-native-swipe-gestures'
import { useState } from "react";

interface Props {
    children: any,
    title: string,
    navigation: any
}

const Container = styled.View`
    background-color: #FFFFFF
    display: flex
    height:100%
`
const Content = styled.View`
    display: flex
    flex: auto
`
const DrawerSection = styled.View`
    position; absolute
    width: 70%
    top: 0
    left: 0
`

const Layout = ({ children, title, navigation }: Props) => {
    const [isSwiped, setIsSwiped] = useState(false)
    console.log(isSwiped)
    return (
        // <GestureRecognizer
        //     onSwipeRight={state=>setIsSwiped(true)}
        //     onSwipeLeft={state=>setIsSwiped(false)}
        // >

            <Container>
                <Header title={title} />
                <Content>
                    {children}
                </Content>
                <Footer navigation={navigation} title={title} />

                
                
            </Container>
        //     {/* <DrawerSection>
        //         {isSwiped ? (
        //         <Drawer/>
        //         ): null}
        //     </DrawerSection>

        // </GestureRecognizer> */}
    )
}

export default memo(Layout)