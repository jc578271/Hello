import React, {memo, useEffect, useState} from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { IC_SEARCH, IMG_PROFILE } from '../assets'
import dummydb from '../assets/dummydb/db'
import { groupedData, filterData } from "../utils/helper";

const Contact = (props:any) => {
    const chars = ['Digit',
        'A','B','C','D','E','F','G','H','I','J','K','L','M',
        'N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const [db, setDb] = useState<any[]>([])
    const [isMounted, setMounted] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [posYs, setPosYs] = useState<any>({"Digit": 0})
    const [scrollRef, setScrollRef] = useState<ScrollView|null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])
        
    useEffect(() => {
        setDb(filterData(searchInput, dummydb))
    }, [isMounted, searchInput])
    

    const onChangePosYs = (e: LayoutChangeEvent, char: string) => {
        let newPosYs = posYs
        newPosYs[char] = e.nativeEvent.layout.y
        setPosYs(newPosYs)
    }

    const groupByCharRender = (char:string, db: any[]) => (
        <View>
            <CharSection>
                <BgCharSection></BgCharSection>
                <Chartext>{char}</Chartext>
            </CharSection>
            <ItemsSection>
                {groupedData(char, db).map(({ name, number }, key) => {
                    return <View key={key}>{itemRender(name, number, key)}</View>
                })}
            </ItemsSection>
        </View>
    )

    const itemRender = (name: string, number: string, key: number) => (
        <Item key={key}>
            <ProfileImg source={IMG_PROFILE} />
            <InfoSection style={{borderTopWidth: key==0?0:0.5}}>
                <ProfileName>{name}</ProfileName>
                <ProfileNumber>{number}</ProfileNumber>
            </InfoSection>
        </Item>
    )

    return (
        <Container>
            <SearchSection>
                <SearchIcon source={IC_SEARCH} />
                <SearchInput 
                    placeholder="Tìm kiếm danh bạ"
                    onChangeText={(text) => {
                        setSearchInput(text)
                    }}
                />
            </SearchSection>
            <ScrollContent ref={view => setScrollRef(view)}>
                {chars.map((char, key) => {
                    return groupedData(char, db).length >0
                    ? <View onLayout={e => onChangePosYs(e, char)} key={key}>
                        {groupByCharRender(char, db)}
                    </View>
                    : null
                })}
                <Sth></Sth>
            </ScrollContent>
            <SideCharSection>
                {chars.map((char, key) => (
                    <SideCharBtn 
                        key={key}
                        onPress={() => {
                            if(posYs[char] != undefined) {
                                scrollRef?.scrollTo({y: posYs[char]})
                            }
                        }}>
                        <SideCharText >{char}</SideCharText>
                    </SideCharBtn>
                ))}
            </SideCharSection>
        </Container>
    )
}

export default memo(Contact)

const Container =  styled.View`
    display: flex
    background-color: #FFFFFF
`
const SearchSection = styled.View`
    display: flex
    flex-direction: row
    align-items: center
    background-color: #F2f2f2
    opacity: 0.5
    border-radius: 6px
    overflow: hidden
    margin: 0 16px 10px 16px
    
`
const SearchIcon = styled.Image`
    height: 16px
    width: 16px
    margin-left: 10px
`
const SearchInput = styled.TextInput`
    flex: auto
    margin: 0
    font-size: 13px
    font-weight: 300
    padding: 10px
`
const ScrollContent = styled.ScrollView`
    display: flex
`
const CharSection = styled.View`
    height: 36px
    justify-content: center
    padding: 0 16px
`
const BgCharSection = styled.View`
    position: absolute
    background-color: #E0E0E0
    opacity: 0.5
    top: 0
    left: 0
    right: 0
    bottom: 0
`
const Chartext = styled.Text`
    color: #333333;
    font-weight: 500;
    font-size: 15px;
    line-height: 16px;
`
const ItemsSection = styled.View`
    
`
const Item = styled.View`
    display: flex
    flex-direction: row
    padding: 0 16px 12px 16px
    align-items: center
`
const ProfileImg = styled.Image`
    margin-top: 14px
    height: 40px;
    width: 40px;
    border-radius: 100px;
`
const InfoSection = styled.View`
    margin: 0 16px
    padding-top: 15px
    border-color: #BDBDBD;
    flex: auto
`
const ProfileName = styled.Text`
    font-weight: 500
    font-size: 16px
    line-height: 16px
    color: #333333
    margin: 5px 0
`
const ProfileNumber = styled.Text`
    font-weight: 400
    font-size: 14px
    line-height: 16px
    color: #828282
`
const Sth = styled.View`
    height: 110px
`
const SideCharSection = styled.View`
    position: absolute
    right: 10px
    top: 10px
    display: flex
`
const SideCharBtn = styled.TouchableOpacity`
    
`
const SideCharText = styled.Text`
    font-size: 13px;
    line-height: 22px;
    /* or 169% */

    text-align: right;
    letter-spacing: 0.12px;
    color: #F2A54A;
`