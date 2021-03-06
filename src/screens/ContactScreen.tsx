// @ts-ignore
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import {LayoutChangeEvent, ScrollView, View} from "react-native";
import styled from "styled-components/native";
import {IC_SEARCH, IMG_DEFAULTPROFILE} from '../assets'
import {useContacts} from "../store";
import {filterData, groupedData} from "../utils/helper";
import FastImage from "react-native-fast-image";
import {useDrawerStatus} from "@react-navigation/drawer";
import {useDispatch} from "react-redux";

const chars = ['Digit',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const ContactScreen = ({navigation}: any) => {

    const [groupedContact, setGroupedContact] = useState({})
    const [isMounted, setMounted] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [posYs, setPosYs] = useState<any>({"Digit": 0})
    const [scrollRef, setScrollRef] = useState<ScrollView | null>(null)
    const contacts = useContacts()
    const drawerStatus = useDrawerStatus();
    const dispatch = useDispatch()

    const isDrawerOpen = useMemo(() => {
        return drawerStatus === "open"
    }, [drawerStatus])

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted) {
            let db = filterData(searchInput, contacts, dispatch)
            setGroupedContact(groupedData(db))
        }
    }, [isMounted, searchInput, JSON.stringify(contacts), JSON.stringify(groupedContact)])

    const onChangePosYs = (e: LayoutChangeEvent, char: string) => {
        let newPosYs = posYs
        newPosYs[char] = e.nativeEvent.layout.y
        setPosYs(newPosYs)
    }

    const onCharPress = useCallback((char: string) => {
        if (posYs[char] != undefined) {
            scrollRef?.scrollTo({y: posYs[char]})
        }
    }, [posYs])

    const groupedContactLength = useMemo(() => {
        return Object.keys(groupedContact).length
    }, [groupedContact])

    const groupByCharRender = useCallback(() => {
        return Object.keys(groupedContact).map((char, key) => groupedContact[char]?.length && (
            <View onLayout={e => onChangePosYs(e, char)} key={key}>
                <CharSection>
                    <BgCharSection/>
                    <CharText>{char}</CharText>
                </CharSection>
                <ItemsSection>
                    {groupedContact[char].map(({id, firstName, lastName, phones, avatar}, index) => {
                            let fullName = firstName + " " + lastName
                            return (
                                <View key={index}>
                                    {itemRender({id, fullName, phones, avatar}, index)}
                                </View>
                            )
                        }
                    )}
                </ItemsSection>
            </View>
        ))
    }, [groupedContactLength])

    const itemOnPress = useCallback((id: string) => {
        navigation.navigate('DetailContact', {id})
    }, [])

    const itemRender = useCallback(({id, fullName, phones, avatar}: any, key: number) => (
        <Item key={key} onPress={() => itemOnPress(id)}>
            <ProfileImgSection>
                <ProfileImg
                    source={avatar ? {uri: avatar} : IMG_DEFAULTPROFILE}
                    style={avatar && {width: 40, height: 40}}/>
            </ProfileImgSection>
            <InfoSection style={{borderTopWidth: key == 0 ? 0 : 0.5}}>
                <ProfileName>{fullName}</ProfileName>
                <ProfileNumber>{phones[0]}</ProfileNumber>
            </InfoSection>
        </Item>
    ), [itemOnPress])

    return (
        <Container>
            <SearchSection>
                <SearchIcon source={IC_SEARCH}/>
                <SearchInput
                    placeholder="T??m ki???m danh b???"
                    onChangeText={(text) => {
                        setSearchInput(text)
                    }}
                />
            </SearchSection>
            <ScrollContent ref={view => setScrollRef(view)}>
                {groupByCharRender()}
                <Sth/>
            </ScrollContent>
            <SideCharSection>
                {chars.map((char, key) => (
                    <SideCharBtn
                        key={key}
                        onPress={() => onCharPress(char)}>
                        <SideCharText isDrawerOpen={isDrawerOpen}>{char}</SideCharText>
                    </SideCharBtn>
                ))}
            </SideCharSection>
        </Container>
    )
}

export default memo(ContactScreen)

const Container = styled.View`
  display: flex;
  flex: auto;
  background-color: #FFFFFF;
`
const SearchSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #F2f2f2;
  opacity: 0.5;
  border-radius: 6px;
  overflow: hidden;
  margin: 0 16px 10px 16px;

`
const SearchIcon = styled.Image`
  height: 16px;
  width: 16px;
  margin-left: 10px;
`
const SearchInput = styled.TextInput`
  flex: auto;
  margin: 0;
  font-size: 13px;
  font-weight: 300;
  padding: 10px;
`
const ScrollContent = styled.ScrollView`
  display: flex;
`
const CharSection = styled.View`
  height: 36px;
  justify-content: center;
  padding: 0 16px;
`
const BgCharSection = styled.View`
  position: absolute;
  background-color: #E0E0E0;
  opacity: 0.5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const CharText = styled.Text`
  color: #333333;
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
`
const ItemsSection = styled.View`

`
const Item = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 0 16px 12px 16px;
  align-items: center;
`
const ProfileImgSection = styled.View`
  margin-top: 14px;
  width: 40px;
  height: 40px;
  background-color: #F2F2F2;
  border-radius: 100px;
  align-self: center;
  align-items: center;
  justify-content: center;
`
const ProfileImg = styled(FastImage)`
  height: 30px;
  width: 30px;
  border-radius: 100px;
`
const InfoSection = styled.View`
  margin: 0 16px;
  padding-top: 15px;
  border-color: #BDBDBD;
  flex: auto;
`
const ProfileName = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #333333;
  margin: 5px 0;
`
const ProfileNumber = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #828282;
`
const Sth = styled.View`
  height: 70px;
`
const SideCharSection = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
`
const SideCharBtn = styled.TouchableOpacity`

`
const SideCharText = styled.Text<{ isDrawerOpen?: boolean }>`
  font-size: 13px;
  line-height: 22px;
  /* or 169% */

  text-align: right;
  letter-spacing: 0.12px;
  color: ${props => !props.isDrawerOpen ? '#F2A54A' : '#BDBDBD'};
`