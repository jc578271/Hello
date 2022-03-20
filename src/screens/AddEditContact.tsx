import React, { memo, useEffect, useState } from "react";
import { Platform, StatusBar, Text, View, BackHandler } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { IC_EDITPROFILEIMG, IC_GREENADD, IC_REDDELETE, IMG_DEFAULTPROFILE } from "../assets";

const AddItemContact = ({ navigation }) => {
    const insets = useSafeAreaInsets()
    const [phone, setPhone] = useState({
        context: '',
        list: [],
        isEditing: false,
        id: -1,
        count: 0
    })

    useEffect(() => {
        restoreState()
        BackHandler.addEventListener('hardwareBackPress',restoreState)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', restoreState)
        }
    }, [])

    const restoreState = () => {
        setPhone({
            context: '',
            list: [],
            isEditing: false,
            id: -1,
            count: 0
        })
        navigation.goBack()
        return true
    }

    const editingPhoneRender = ({ context, list, isEditing, id, count }: any) => {
        console.log(isEditing, count)
        return list.map((x:any, key:number) => (
            <EditSection key={key}>
                <DeleteBtn>
                    <DeleteIc source={IC_REDDELETE} />
                </DeleteBtn>
                {isEditing && id == key ? (
                    <EditTextInput 
                        placeholder="Hello"
                        onBlur={() => setPhone({ ...phone, id: -1, isEditing: false })}
                        onChangeText={(text) => setPhone({ ...phone, context: text })}
                    />
                ) : (
                    <ContextButton
                        onFocus={() => setPhone({ ...phone, id: key, isEditing: true })}
                    >
                        <ContextText>{list[key]}</ContextText>
                    </ContextButton>
                )
                }
                
            </EditSection>
        ))
    }

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
                {editingPhoneRender(phone)}
                <AddBtn onPress={() => setPhone({ 
                    ...phone,
                    list: [...phone.list, phone.context],
                    isEditing: true
                })}>
                    <AddIc source={IC_GREENADD} />
                </AddBtn>
                <AddText>Add phone number</AddText>
            </AddSection>
            <AddSection>
                <AddBtn>
                    <AddIc source={IC_GREENADD} />
                </AddBtn>
                <AddText>Add email</AddText>
            </AddSection>
            <AddSection>
                <AddBtn>
                    <AddIc source={IC_GREENADD} />
                </AddBtn>
                <AddText>Add address</AddText>
            </AddSection>
            <AddSection>
                <AddBtn>
                    <AddIc source={IC_GREENADD} />
                </AddBtn>
                <AddText>Add birthday</AddText>
            </AddSection>
        </Container>
        </>
    )
}

export default AddItemContact

const Container = styled.View`
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
    flex-direction: row;
    padding: 34px 0 10px 0;
    border-bottom-width: 0.5px;
    border-bottom-color: solid rgba(0, 0, 0, 0.1);
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
const EditSection = styled.View``
const DeleteBtn = styled.TouchableOpacity``
const DeleteIc = styled.Image``
const ContextText = styled.Text`

`
const ContextButton = styled.TouchableOpacity`

`
const EditTextInput = styled.TextInput`
    margin-left: 16px;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    /* identical to box height, or 147% */

    letter-spacing: -0.41px;

    /* Blue 1 */

    color: #2F80ED;
`