import React, { memo, useEffect, useState } from "react";
import { Platform, StatusBar, Text, View, BackHandler, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import moment from "moment"
import { IC_EDITPROFILEIMG, IC_GREENADD, IC_REDDELETE, IMG_DEFAULTPROFILE } from "../assets";

const AddItemContact = ({ navigation }) => {
    const insets = useSafeAreaInsets()
    const [phone, setPhone] = useState({
        type: "numeric",
        title: "phone number",
        list: [],
        count: 0,
        isEditing: false,
        id: -1
    })
    const [email, setEmail] = useState({
        type: "email-address",
        title: "email",
        count: 0,
        list: [],
        isEditing: false,
        id: -1
    })
    const [address, setAddress] = useState({
        type: "default",
        title: "address",
        count: 0,
        list: [],
        isEditing: false,
        id: -1
    })
    const [birthday, setBirthday] = useState({
        type: "datePicker",
        title: "birthday",
        count: 0,
        list: [],
        isEditing: false,
        id: -1
    })

    useEffect(() => {
        // onBack of device handler
        BackHandler.addEventListener('hardwareBackPress',restoreState)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', restoreState)
        }
    }, [])

    const restoreState = () => {
        setPhone({...phone, list: [], isEditing: false,id: -1, count: 0 })
        setEmail({ ...email, list: [], isEditing: false, id: -1, count: 0 })
        setAddress({ ...address, list: [], isEditing: false, id: -1, count: 0 })
        setBirthday({ ...birthday, list: [], isEditing: false, id: -1, count: 0 })
        navigation.goBack()
        return true
    }

    const infoDeleteOnPress = (typeInfo, key, setInfo) => {
        const { list } = typeInfo
        let newList = list
        newList.splice(key, 1)
        setInfo({ ...typeInfo, list: newList })
    }

    const infoOnChange = (typeInfo, key, text, setInfo) => {
        const {list} = typeInfo
        let newList = list
        newList[key] = text
        setInfo({ ...typeInfo, list: newList })
    }

    const addInfoOnPress = (typeInfo, setTypeInfo) => {
        
        // let newInput = typeInfo.type == "datePicker" ? moment().valueOf() : ''
        setTypeInfo({
            ...typeInfo,
            // list: [...typeInfo.list, newInput],
            count: typeInfo.count+1,
            isEditing: true,
            id: typeInfo.list.length
        })
    }

    const onDateConfirm = (date, key) => {
        infoOnChange(birthday, key, date, setBirthday)
        setBirthday(prev => ({...prev, isEditing: false}))
        // console.log(date)
    }
    const onDateCancel = (key) => {
        setBirthday(prev => {
            let newList = prev.list
            console.log(newList)
            if (newList.length=0) {
                newList.splice(key, 1)
            }
            return { ...prev, isEditing: false, list: newList }
        })
    }

    const dialogModalRender = (key) => {
        const { isEditing, list } = birthday
        return (
            <DateTimePickerModal
                date={moment(list[key]).toDate()}
                isVisible={isEditing}
                mode="date"
                onConfirm={(date) => onDateConfirm(date, key)}
                onCancel={()=>onDateCancel(key)}
            />
        )
    }

    const editingInfoRender = (
            typeInfo: { 
                list: any[],
                isEditing:boolean,
                id:number,
                type: any,
                title:string 
            },
            setInfo
        ) => {
        const { list, isEditing, id, type, title } = typeInfo
        return list.map((x:any, key:number) => (
            <EditSection key={key}>
                <DeleteBtn onPress={() => infoDeleteOnPress(typeInfo, key, setInfo)}>
                    <DeleteIc source={IC_REDDELETE} />
                </DeleteBtn>
                {isEditing && id == key && type != "datePicker" ? (
                    <EditTextInput
                        autoFocus={true}
                        keyboardType={type}
                        placeholder={`add your ${title}`}
                        value={list[key]}
                        onBlur={() => setInfo({ ...typeInfo, id: -1, isEditing: false })}   
                        onChangeText={(text) => infoOnChange(typeInfo, key, text, setInfo)}
                    />
                ) : isEditing && id == key && type == "datePicker" ? dialogModalRender(key) : (
                    <ContextButton onPress={() => setInfo({ ...typeInfo, id: key, isEditing: true })}>
                        <ContextText>{type == "datePicker" ? moment(list[key]).format("MMM Do YYYY") : list[key]}</ContextText>
                    </ContextButton>
                )}
            </EditSection>
        ))
    }

    // console.log(phoneRef, phone.list.length)

    return (
        <>
        <View style={{
            backgroundColor: "#FFFFFF",
            height: Platform.OS == "ios" ? insets.top : StatusBar.currentHeight,
        }}>
        </View>
        <Container>
            <HeaderSection>
                <CancelBtn onPress={() => {
                    restoreState()
                }}>
                    <CancelText>Cancel</CancelText>
                </CancelBtn>
                <DoneBtn>
                    <DoneText>Done</DoneText>
                </DoneBtn>
            </HeaderSection>
            <ProfileImgSection>
                <ProfileImg source={IMG_DEFAULTPROFILE} />
                <CamIcon source={IC_EDITPROFILEIMG} />
            </ProfileImgSection>
            <SurnameSection>
                <SurnameInput placeholder="Surname"/>
            </SurnameSection>
            <LastnameSection>
                <LastnameInput placeholder="Firstname"/>
            </LastnameSection>
            <OrganizationSection>
                <OrganizationInput placeholder="Organization"/>
            </OrganizationSection>
            <AddSection>
                {editingInfoRender(phone, setPhone)}
                <AddGroup>
                    <AddBtn onPress={() => addInfoOnPress(phone, setPhone)}>
                        <AddIc source={IC_GREENADD} />
                    </AddBtn>
                    <AddText>Add phone number</AddText>
                </AddGroup>
            </AddSection>
            <AddSection>
                {editingInfoRender(email, setEmail)}
                <AddGroup>
                        <AddBtn onPress={() => addInfoOnPress(email, setEmail)}>
                        <AddIc source={IC_GREENADD} />
                    </AddBtn>
                    <AddText>Add email</AddText>
                </AddGroup>
            </AddSection>
            <AddSection>
                {editingInfoRender(address, setAddress)}
                <AddGroup>
                        <AddBtn onPress={() => addInfoOnPress(address, setAddress)}>
                        <AddIc source={IC_GREENADD} />
                    </AddBtn>
                    <AddText>Add address</AddText>
                </AddGroup>
            </AddSection>
                <AddSection style={{ borderBottomWidth: birthday.list.length == 0 ? 0.5:0}}>
                {editingInfoRender(birthday, setBirthday)}
                {birthday.list.length == 0 ? (
                    <AddGroup>
                        <AddBtn onPress={() => addInfoOnPress(birthday, setBirthday)}>
                            <AddIc source={IC_GREENADD} />
                        </AddBtn>
                        <AddText>Add birthday</AddText>
                    </AddGroup>
                ):null}
                
            </AddSection>
        </Container>
        </>
    )
}

export default AddItemContact

const Container = styled.ScrollView`
    background-color: #FFFFFF;
    display: flex;
    height: 100%;
    padding: 0px 16px;
`
const HeaderSection = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const CancelBtn = styled.TouchableOpacity`

`
const CancelText = styled.Text`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height, or 122% */

    letter-spacing: -0.41px;

    color: #F2A54A;
`
const DoneBtn = styled.TouchableOpacity`
    
`
const DoneText = styled.Text`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height, or 122% */

    text-align: center;
    letter-spacing: -0.41px;

    /* Gray 3 */

    color: #828282;
`
const ProfileImgSection = styled.View`
    margin-top: 12px;
    width: 100px;
    height: 100px;
    background-color: #F2F2F2;
    border-radius: 100px;
    align-self: center;
    align-items: center;
    justify-content: center;
`
const ProfileImg = styled.Image`
    height: 80px;
    width: 80px;
`
const CamIcon = styled.Image`
    position: absolute;
    bottom: 0;
    right: 0;
`
const SurnameSection = styled.View`
    margin-top: 8px;
    padding: 16px 11px;
    border-bottom-width: 0.5px;
    border-bottom-color: solid rgba(0, 0, 0, 0.1);
`
const SurnameInput = styled.TextInput`
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    /* identical to box height, or 147% */

    letter-spacing: -0.41px;
`
const LastnameSection = styled(SurnameSection)`
    margin-top: 0;
`
const LastnameInput = styled(SurnameInput)`

`
const OrganizationSection = styled(SurnameSection)`
    margin-top: 0;
`
const OrganizationInput = styled(SurnameInput)`

`
const AddSection = styled.View`
    padding: 34px 0 10px 0;
    border-bottom-width: 0.5px;
    border-bottom-color: solid rgba(0, 0, 0, 0.1);
`
const AddGroup = styled.View`
    flex-direction: row;
    padding-top: 10px;
`
const AddText = styled.Text`
    margin-left: 16px;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    /* identical to box height, or 147% */

    letter-spacing: -0.41px;
    text-transform: lowercase;

    /* Gray 1 */

    color: #333333;
`
const AddBtn = styled.TouchableOpacity`

`
const AddIc = styled.Image`
    height: 24px;
    width: 24px;
`
const EditSection = styled.View`
    flex-direction: row;
    padding: 10px 0 10px 0;
    border-bottom-width: 0.5px;
    border-bottom-color: solid rgba(0, 0, 0, 0.1);
    align-items: center;
`
const DeleteBtn = styled.TouchableOpacity``
const DeleteIc = styled.Image``
const ContextButton = styled.TouchableOpacity`
    flex: auto;
    margin-left: 16px;
`
const ContextText = styled.Text`
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    /* identical to box height, or 147% */

    letter-spacing: -0.41px;

    /* Blue 1 */

    color: #2F80ED;
`
const EditTextInput = styled.TextInput`
    margin-left: 16px;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    /* identical to box height, or 147% */

    letter-spacing: -0.41px;
`
const DateModal = styled.View`
    background-color: #FFFFFF;
    align-items: center;
    border-radius: 10px;
`
const DateConfirmBtn = styled.TouchableOpacity`

`
const DateCancelBtn = styled