// @ts-ignore
import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import {Dimensions, KeyboardAvoidingView, Platform, StatusBar, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import styled from "styled-components/native";
// @ts-ignore
import moment from "moment"
import ImageResizer from 'react-native-image-resizer';
import Toast, {ToastShowParams} from "react-native-toast-message"
import * as ImagePicker from "react-native-image-picker"
import {IC_EDITPROFILEIMG, IC_GREENADD, IC_REDDELETE, IMG_DEFAULTPROFILE} from "../assets";
import {useContacts} from "../store";
import {updateContactAction} from "../actions"
import {useDispatch} from "react-redux";
import {toastConfig} from "../components/BaseToast";
import {StatusBarSection} from "../components/Header";
import FastImage from "react-native-fast-image";

const AddItemContact = ({navigation, route}) => {
    const insets = useSafeAreaInsets()
    const [params, setParams] = useState({
        id: moment().valueOf().toString(),
        firstName: "",
        lastName: "",
        organization: "",
        avatar: "",
        phones: [],
        emails: [],
        addresses: [],
        birthday: []
    })
    const [editingType, setEditingType] = useState({
        phones: {
            typeKeyboard: "numeric",
            isEditing: false,
            id: -1,
            count: 0
        },
        emails: {
            typeKeyboard: "email-address",
            isEditing: false,
            id: -1,
            count: 0
        },
        addresses: {
            typeKeyboard: "default",
            isEditing: false,
            id: -1,
            count: 0
        },
        birthday: {
            typeKeyboard: "datePicker",
            isEditing: false,
            id: -1,
            count: 0
        }
    })
    const [isSubmitted, setSubmitted] = useState(false)
    const [isValid, setIsValid] = useState({fullName: false, phone: false, email: false})
    const dispatch = useDispatch()
    const contacts = useContacts()
    const [isMounted, setMounted] = useState(false)
    let ref = useRef<any>({}).current
    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setSubmitted(false)
        if (isMounted && route.params?.id) {
            let itemContact = contacts.find(item => item.id == route.params.id)
            let {
                phones,
                emails,
                addresses,
                birthday
            } = itemContact
            setParams(prev => {
                setEditingType(editPrev => ({
                    ...editPrev,
                    phones: {...editPrev.phones, count: phones.length},
                    emails: {...editPrev.emails, count: emails.length},
                    addresses: {...editPrev.addresses, count: addresses.length},
                    birthday: {...editPrev.birthday, count: birthday.length},
                }))
                return {
                    ...prev,
                    ...itemContact,
                    phones: [...phones],
                    emails: [...emails],
                    addresses: [...addresses],
                    birthday: [...birthday]
                }
            })
        }

    }, [isSubmitted, isMounted, route.params])

    useEffect(() => {
        let isValidName = params.firstName + params.lastName != "",
            isValidPhone = !!params.phones.filter(item => item.trim() != "").length,
            isValidEmail = params.emails.every(item => (
                /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(item.trim())
                || item.trim() == ""
            ))

        setIsValid({fullName: isValidName, phone: isValidPhone, email: isValidEmail})

    }, [JSON.stringify(params)])

    const restoreState = useCallback(() => {
        navigation.goBack()
    }, [])

    const profileInfoOnChange = useCallback((key: string, text: string) => {
        setParams(prev => ({
            ...prev,
            [key]: text
        }))
    }, [])

    const camOnPress = useCallback(() => {
        ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
        }, (res) => {
            if (res.assets) {
                ImageResizer.createResizedImage(
                    res?.assets[0]?.uri,
                    200,
                    200,
                    "JPEG",
                    100
                )
                    .then(response => {
                        setParams(prev => ({...prev, avatar: res.assets?.length ? response.uri : ""}));
                    })
            }
        })
    }, [params.avatar])


    const infoDeleteOnPress = useCallback((key: number, typeInfo: string) => {
        setParams(prev => {
            let newList = prev[typeInfo]
            newList.splice(key, 1)
            setEditingType(editingPrev => ({
                ...editingPrev,
                [typeInfo]: {
                    ...editingPrev[typeInfo],
                    count: newList.length,
                    id: newList.indexOf("")
                }
            }))
            return {
                ...prev,
                [typeInfo]: newList
            }
        })
    }, [])

    const infoOnChange = useCallback((key: number, text: string, typeInfo: string) => {
        setParams(prev => {
            let newList = prev[typeInfo]
            newList[key] = text
            return {
                ...prev,
                [typeInfo]: newList
            }
        })
    }, [params])

    const addInfoOnPress = useCallback((typeInfo: string) => {
        setParams(prev => {
            let newList = prev[typeInfo].map(item => item.trim())
            let newCount = newList.length
            if (typeInfo == "birthday") {
                newCount = 1
            } else if (newList.indexOf("") == -1) {
                newList.push("")
                newCount = newList.length
            }

            setEditingType(editPrev => ({
                ...editPrev,
                [typeInfo]: {
                    ...editPrev[typeInfo],
                    count: newCount,
                    id: newList.indexOf(""),
                    isEditing: true
                }
            }))
            return {
                ...prev,
                [typeInfo]: newList
            }
        })
        ref[typeInfo]?.focus()
    }, [])

    const onDateConfirm = useCallback((date, key) => {
        setEditingType(prev => ({
            ...prev,
            birthday: {
                ...prev.birthday,
                isEditing: false
            }
        }))
        setParams(prev => {
            let newList = prev.birthday
            newList[key] = moment(date).valueOf()
            return {
                ...prev,
                birthday: newList
            }
        })
    }, [editingType.birthday])

    const onDateCancel = useCallback(() => {
        setEditingType(prev => {
            if (prev.birthday.count == 1 && params.birthday.length == 1) {
                return {
                    ...prev,
                    birthday: {
                        ...prev.birthday,
                        isEditing: false
                    }
                }
            } else {
                return {
                    ...prev,
                    birthday: {
                        ...prev.birthday,
                        count: prev.birthday.count - 1,
                        isEditing: false
                    }
                }
            }
        })
    }, [editingType.birthday])

    const dialogModalRender = useCallback((key) => {
        return (
            <DateTimePickerModal
                date={moment(params.birthday[key]).toDate()}
                isVisible={editingType.birthday.isEditing}
                mode="date"
                onConfirm={(date) => onDateConfirm(date, key)}
                onCancel={() => onDateCancel()}
            />
        )
    }, [editingType.birthday])

    const contextOnPress = useCallback((key: number, typeInfo: string) => {
        setEditingType(prev => ({
            ...prev,
            [typeInfo]: {
                ...prev[typeInfo],
                id: key,
                isEditing: true
            }
        }))
    }, [])

    const onDone = useCallback(() => {
        let toastConfig: ToastShowParams = {
            position: "bottom",
            visibilityTime: 1000,
            autoHide: true
        }

        if (!isValid.fullName) {
            Toast.show({
                ...toastConfig,
                text1: "Enter name please",
                type: "error"
            })
        } else if (!isValid.phone) {
            Toast.show({
                ...toastConfig,
                text1: "Enter phone number please",
                type: "error"
            })
        } else if (!isValid.email) {
            Toast.show({
                ...toastConfig,
                text1: "Invalid email",
                type: "error"
            })
        } else {
            let submit = {
                id: params.id,
                avatar: params.avatar,
                firstName: params.firstName,
                lastName: params.lastName,
                organization: params.organization,
                phones: params.phones.filter(item => item.trim() != ""),
                emails: params.emails.filter(item => item.trim() != ""),
                addresses: params.addresses.filter(item => item.trim() != ""),
                birthday: params.birthday
            }
            // @ts-ignore
            dispatch(updateContactAction(submit))
            navigation.navigate("Contact")
        }

    }, [isValid, params])

    const editingInfoRender = useCallback((typeInfo) => {
        const {isEditing, count, id, typeKeyboard} = editingType[typeInfo]
        const list = params[typeInfo]
        return Array(count).fill(0)
            .map((x: any, key: number) => {
                return (
                    <EditSection key={key}>
                        <DeleteBtn onPress={() => infoDeleteOnPress(key, typeInfo)}>
                            <DeleteIc source={IC_REDDELETE}/>
                        </DeleteBtn>
                        {isEditing && typeInfo == "birthday" ? dialogModalRender(key)
                            : (isEditing && id == key) || list[key] == "" ? (
                                <EditTextInput
                                    ref={view => ref[typeInfo] = view}
                                    autoFocus={true}
                                    keyboardType={typeKeyboard}
                                    placeholder={`add ${typeInfo}`}
                                    value={list[key]}
                                    onFocus={() => contextOnPress(key, typeInfo)}
                                    onChangeText={(text) => infoOnChange(key, text, typeInfo)}
                                />
                            ) : (
                                <ContextButton onPress={() => contextOnPress(key, typeInfo)}>
                                    <ContextText>{typeInfo == "birthday" ? moment(list[key]).format("Do MMM YYYY") : list[key]}</ContextText>
                                </ContextButton>
                            )}
                    </EditSection>
                )
            })
    }, [editingType])


    return (
        <KeyBoardView
            behavior={Platform.OS == "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <StatusBarSection height={Platform.OS == "ios" ? insets.top: StatusBar.currentHeight}/>
            <HeaderSection>
                <CancelBtn onPress={() => restoreState()}>
                    <CancelText>Cancel</CancelText>
                </CancelBtn>
                <DoneBtn onPress={onDone}>
                    <DoneText isValid={isValid}>Done</DoneText>
                </DoneBtn>
            </HeaderSection>
            <Container keyboardShouldPersistTaps='handled'>

                <ProfileImgSection>
                    <ProfileImg
                        source={params.avatar ? {uri: params.avatar} : IMG_DEFAULTPROFILE}
                        avatar = {params.avatar}
                    />
                    <CamBtn onPress={camOnPress}>
                        <CamIcon source={IC_EDITPROFILEIMG}/>
                    </CamBtn>

                </ProfileImgSection>
                <SurnameSection>
                    <SurnameInput
                        value={params.firstName}
                        onChangeText={(text) => profileInfoOnChange("firstName", text)}
                        placeholder="First name"/>
                </SurnameSection>
                <LastnameSection>
                    <LastnameInput
                        value={params.lastName}
                        onChangeText={(text) => profileInfoOnChange("lastName", text)}
                        placeholder="Last name"/>
                </LastnameSection>
                <OrganizationSection>
                    <OrganizationInput
                        value={params.organization}
                        onChangeText={(text) => profileInfoOnChange("organization", text)}
                        placeholder="Organization"/>
                </OrganizationSection>
                <AddSection>
                    {editingInfoRender("phones")}
                    <AddGroup onPress={() => addInfoOnPress("phones")}>
                        <AddBtn>
                            <AddIc source={IC_GREENADD}/>
                        </AddBtn>
                        <AddText>Add phone number</AddText>
                    </AddGroup>
                </AddSection>
                <AddSection>
                    {editingInfoRender("emails")}
                    <AddGroup onPress={() => addInfoOnPress("emails")}>
                        <AddBtn>
                            <AddIc source={IC_GREENADD}/>
                        </AddBtn>
                        <AddText>Add email</AddText>
                    </AddGroup>
                </AddSection>
                <AddSection>
                    {editingInfoRender("addresses")}
                    <AddGroup onPress={() => addInfoOnPress("addresses")}>
                        <AddBtn>
                            <AddIc source={IC_GREENADD}/>
                        </AddBtn>
                        <AddText>Add address</AddText>
                    </AddGroup>
                </AddSection>
                <AddSection style={{borderBottomWidth: params.birthday.length == 0 ? 0.5 : 0}}>
                    {editingInfoRender("birthday")}
                    {params.birthday.length == 0 ? (
                        <AddGroup onPress={() => addInfoOnPress("birthday")}>
                            <AddBtn>
                                <AddIc source={IC_GREENADD}/>
                            </AddBtn>
                            <AddText>Add birthday</AddText>
                        </AddGroup>
                    ) : null}

                </AddSection>
            </Container>
            <Toast config={toastConfig}/>
        </KeyBoardView>
    )
}

export default memo(AddItemContact)

const KeyBoardView = styled(KeyboardAvoidingView)`
  flex: auto;
`

const Container = styled.ScrollView`
  background-color: #FFFFFF;
  display: flex;
  flex: auto;
  padding: 0 16px;
`
const HeaderSection = styled.View`
  background-color: #FFFFFF;
  padding: 0 16px;
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
const DoneText = styled.Text<{ isValid?: { fullName: boolean, phone: boolean } }>`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height, or 122% */

  text-align: center;
  letter-spacing: -0.41px;

  /* Gray 3 */

  color: ${(props) => props.isValid.fullName && props.isValid.phone ? '#F2A54A' : '#828282'};
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
const ProfileImg = styled(FastImage)<{avatar?:any}>`
  height: ${props => props.avatar ? 100 : 80}px;
  width: ${props => props.avatar ? 100 : 80}px;
  border-radius: 100px;
`
const CamBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
`
const CamIcon = styled.Image`

`
const SurnameSection = styled.View`
  margin-top: 8px;
  padding: 11px 11px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
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
  border-bottom-color: rgba(0, 0, 0, 0.1);
`
const AddGroup = styled.TouchableOpacity`
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
const AddBtn = styled.View`

`
const AddIc = styled.Image`
  height: 24px;
  width: 24px;
`
const EditSection = styled.View`
  flex-direction: row;
  padding: 10px 0 10px 0;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
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
  flex: auto;
  /* identical to box height, or 147% */

  letter-spacing: -0.41px;
`