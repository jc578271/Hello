import React, { memo } from "react";
import { Dimensions, Text, View } from "react-native";
import styled from "styled-components/native";
import { IC_ADDBTN, IMG_NAVBG, IC_LIST, IC_HISTORY } from "../assets";

const width = Dimensions.get('window').width

// interface Props {
//     state: string,
//     description: any
// }

const Footer = ({ state, descriptors, navigation }: any) => {
 

    const itemRender = () => {
        state.rouets.map((route, index) => {
            console.log(descriptors[route.key])
            return <Text></Text>
        })
        
    }


    return (
        <Container>
            {state.routes.map((route, index) => {
                console.log(descriptors[route.key].route)
                return <Text></Text>
            })}
            {/* <WrapBtn>
                <NavBg source={IMG_NAVBG} />
                <AddBtn>
                    <AddImg resizeMode="contain" source={IC_ADDBTN} />
                </AddBtn>
            </WrapBtn>
            
            <Sth></Sth>
            <WrapItem>
                <ItemBtn
                onPress={() => navigateHandler('History')}>
                    <HistoryImg 
                        resizeMode="cover" source={IC_HISTORY}
                        style={{tintColor: title == 'History' ? 'white' : '#DADADA'}}
                    />
                    <HistoryText style={{color: title == 'History' ? 'white' : '#DADADA'}}>Gần Đây</HistoryText>
                </ItemBtn>
            </WrapItem> */}
        </Container>
    )
}

export default memo(Footer)

const Container = styled.View`
    display: flex;
    flex-direction: row
    align-items: flex-end
`
const WrapItem = styled.View`
    flex: 1
    align-items: center
    justify-content: center
    justify-self: end
    height: 55px
`
const ItemBtn = styled.TouchableOpacity`
    display: flex
    align-self: center;
    justify-content: center
`

const WrapBtn = styled.View`
    position: absolute
    left:0
    right: 0
    top: -45px
    bottom: 0
    display: flex
`
const Sth = styled.View`
    width: 85px
`
const AddBtn = styled.TouchableOpacity`
    width: 85px
    height: 85px
    align-self: center;
`
const AddImg = styled.Image`
    align-self: center;
    width: 100%
    height: 100%
`
const NavBg = styled.Image`
    width: ${width}px;
    position: absolute;
    bottom: 0
`
const ListImg = styled.Image`
    width: 30px
    height: 30px
    margin: auto
`
const ListText = styled.Text`
    font-weigth: 400px
    font-size: 10px
    line-height: 12px
    text-align: center
    margin-top: 4px
`
const HistoryImg = styled(ListImg)``
const HistoryText = styled(ListText)``