import React, { memo } from "react";
import styled from "styled-components/native";
import { IC_MENU, IC_CAM } from "../assets";

const Container = styled.View`
    background-color: #FFFFFF
    display: flex
    flex-direction: row
    margin: 16px
    justify-content: center
    align-items: center
`
const MenuBtn = styled.TouchableOpacity`
    height: 24px
    width: 24px
`
const MenuImg = styled.Image`
    resizeMode: cover
`
const Section1 = styled.View`
    flex: auto
    align-items: center
`
const Title = styled.Text`
    font-weight: 500;
    font-size: 24px;

    letter-spacing: -0.41px;

    /* Gray 1 */

    color: #333333;
`
const CamBtn = styled(MenuBtn)`

`
const CamImg = styled(MenuImg)`

`

interface Props {
    title: string
}

const Header = ({ title }: Props) => {
    return (
        <Container>
            <MenuBtn>
                <MenuImg source={IC_MENU} />
            </MenuBtn>
            <Section1>
                <Title>{title}</Title>
            </Section1>
            <CamBtn>
                <CamImg source={IC_CAM} />
            </CamBtn>
        </Container>
    )
}

export default memo(Header)