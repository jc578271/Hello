import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Platform, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { IC_ADDCOLLECTION, IC_DROP, IC_ITEMCOLLECTION, IMG_PROFILE } from "../assets";

const SideNav = ({ state, navigation, descriptors }:any) => {
    const [isExpanded, setIsExpand] = useState(true)
    const animation = useRef(new Animated.ValueXY({x:0, y: 0})).current
    const [listHeight, setListHeight] = useState(0)
    const insets = useSafeAreaInsets()
    
    
    useEffect(() => {
        let initVal = isExpanded ? listHeight : 0
        let finalVal = isExpanded ? 0 : listHeight
        animation.setValue({x: 0, y:-initVal})
        Animated.spring(animation, {
            toValue: {x:0, y: -finalVal},
            useNativeDriver:false
        }).start()
    }, [isExpanded])


    return (
        <>
        <View style={{
            backgroundColor: "#F2A54A",
            height:  Platform.OS == "ios" ? insets.top: StatusBar.currentHeight
            }}>
        </View>
        <Container>
            <ProflileSection>
                <ProfileImg source={IMG_PROFILE} />
                <TextSection>
                    <NameText>Nguyen Le Hoang</NameText>
                    <SubText>Hello</SubText>
                </TextSection>
            </ProflileSection>
            <AddCollectionSection>
                <AddBtn>
                    <AddImgBtn source={IC_ADDCOLLECTION} />
                </AddBtn>
                <AddTitle>New collection</AddTitle>
            </AddCollectionSection>
            <DropSection>
                <DropBtn onPress={() => setIsExpand(!isExpanded)}>
                    <DropImgBtn style={{transform: [{scaleY: isExpanded?1:-1}]}} source={IC_DROP} />
                </DropBtn>
                <DropText>Collection</DropText>
                <DropEditBtn><DropEditText>Edit</DropEditText></DropEditBtn>
            </DropSection>
            
            <ListSection onLayout={e => setListHeight(e.nativeEvent.layout.height)}>
                <Animated.View style={[animation.getLayout()]}>
                    <ItemSection>
                        <ItemIc source={IC_ITEMCOLLECTION}/>
                        <ItemText>All</ItemText>
                    </ItemSection>
                    <ItemSection>
                        <ItemIc source={IC_ITEMCOLLECTION}/>
                        <ItemText>All</ItemText>
                    </ItemSection>
                    <ItemSection>
                        <ItemIc source={IC_ITEMCOLLECTION}/>
                        <ItemText>All</ItemText>
                    </ItemSection>
                    <ItemSection>
                        <ItemIc source={IC_ITEMCOLLECTION}/>
                        <ItemText>All</ItemText>
                    </ItemSection>
                    <ItemSection>
                        <ItemIc source={IC_ITEMCOLLECTION}/>
                        <ItemText>All</ItemText>
                    </ItemSection>
                    <ItemSection>
                        <ItemIc source={IC_ITEMCOLLECTION}/>
                        <ItemText>All</ItemText>
                    </ItemSection>
                </Animated.View>
            </ListSection>
            
        </Container>
        </>
        
    )
}

export default memo(SideNav)

const Container = styled.View`
    display: flex
`
const ProflileSection = styled.View`
    display: flex
    flex-direction: row
    padding: 5px 20px 12px 20px
    background-color: #F2A54A
    align-items: center
`
const ProfileImg = styled.Image`
    height: 40px
    width: 40px
    border-radius: 100px
`
const TextSection = styled.View`
    display: flex
    margin-left: 10px
`
const NameText = styled.Text`
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    /* identical to box height, or 100% */

    text-align: center;
    letter-spacing: 0.12px;

    color: #FFFFFF;
`
const SubText = styled.Text`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    /* identical to box height, or 133% */

    letter-spacing: 0.12px;

    color: #FFFFFF;
`
const AddCollectionSection = styled.View`
    display: flex
    flex-direction: row
    padding: 12.5px 10px
    align-items: center
`
const AddBtn = styled.TouchableOpacity`
    padding: 10px
    margin-right: 15px
`
const AddImgBtn = styled.Image`
    height: 15px
    width: 15px
`
const AddTitle = styled.Text`
    font-weight: 400;
    font-size: 15px;
    line-height: 16px;
    /* identical to box height, or 107% */

    letter-spacing: 0.12px;

    /* Gray 1 */

    color: #333333;
`

const DropSection = styled.View`
    display: flex
    flex-direction: row
    align-items: center
    padding: 8px 4px 8px 12.5px
    background: rgba(242, 165, 74, 0.1);
`
const DropBtn = styled(AddBtn)`

`
const DropImgBtn = styled(AddImgBtn)`
    height: 5px
    width: 10px
`
const DropText = styled.Text`
    flex: auto
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    /* identical to box height, or 123% */

    letter-spacing: 0.12px;
    text-transform: uppercase;

    /* Gray 1 */

    color: #333333;
`

const DropEditBtn = styled(AddBtn)`
    margin-right: 0
`
const DropEditText = styled.Text`
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    /* identical to box height, or 123% */

    letter-spacing: 0.12px;

    color: #F2A54A;
`
const ListSection = styled.ScrollView`
    display: flex
`
const ItemSection = styled.TouchableOpacity`
    display: flex
    flex-direction: row
    align-items: center
    padding: 12px 20px
`
const ItemIc = styled.Image`
    height: 20px
    width: 20px
    margin-right: 20px
`
const ItemText = styled.Text`
    font-weight: 400;
    font-size: 15px;
    line-height: 16px;
    height: 16px
    /* identical to box height, or 107% */

    letter-spacing: 0.12px;

    /* Gray 1 */

    color: #333333;
`