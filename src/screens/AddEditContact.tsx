import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Platform, StatusBar, Text, View, BackHandler, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import moment from "moment"
import Toast, { ToastShowParams } from "react-native-toast-message"
import * as ImagePicker from "react-native-image-picker"
import { IC_EDITPROFILEIMG, IC_GREENADD, IC_REDDELETE, IMG_DEFAULTPROFILE } from "../assets";
import { updateContactAction, useContacts } from "../store";
import { useDispatch } from "react-redux";
import { toastConfig } from "../components/BaseToast";

const AddItemContact = ({ navigation }) => {
    const insets = useSafeAreaInsets()
    const [params, setParams] = useState({
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
    const [isValid, setIsValid] = useState({ fullName: false, phone: false })
    const dispatch = useDispatch()
    let ref = useRef<any>({}).current

    useEffect(() => {
        setParams({
            firstName: "",
            lastName: "",
            organization: "",
            avatar: "",
            phones: [],
            emails: [],
            addresses: [],
            birthday: []
        })
        setEditingType({
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
    }, [isSubmitted])

    useEffect(() => {
        let isValidName = params.firstName + params.lastName != "",
            isValidPhone = !!params.phones.filter(item => item.trim() != "").length

        setIsValid({ fullName: isValidName, phone: isValidPhone })

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
            setParams(prev => ({ ...prev, avatar: res.assets?.length ? res.assets[0]?.uri : "" }));
        })
    }, [])


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
        } else {
            let submit = {
                id: moment().valueOf().toString(),
                avatar: params.avatar,
                fullName: params.firstName + params.lastName,
                organization: params.organization,
                phones: params.phones.filter(item => item.trim() != ""),
                emails: params.emails.filter(item => item.trim() != ""),
                addresses: params.addresses.filter(item => item.trim() != ""),
                birthday: params.birthday
            }
            dispatch(updateContactAction(submit)).then(() => {
                console.log("done")
            })
            console.log(submit)
            setSubmitted(!isSubmitted)
            navigation.navigate("Contact")
        }

    }, [isValid, params])

    const editingInfoRender = useCallback((typeInfo) => {
        const { isEditing, count, id, typeKeyboard } = editingType[typeInfo]
        const list = params[typeInfo]
        return Array(count).fill(0)
            .map((x: any, key: number) => {
                return (
                    <EditSection key={key}>
                        <DeleteBtn onPress={() => infoDeleteOnPress(key, typeInfo)}>
                            <DeleteIc source={IC_REDDELETE} />
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
        <>
            <View style={{
                backgroundColor: "#FFFFFF",
                height: Platform.OS == "ios" ? insets.top : StatusBar.currentHeight + 16,
            }}>
            </View>
            <HeaderSection>
                <CancelBtn onPress={() => restoreState()}>
                    <CancelText>Cancel</CancelText>
                </CancelBtn>
                <DoneBtn onPress={onDone}>
                    <DoneText isValid={isValid}>Done</DoneText>
                </DoneBtn>
            </HeaderSection>
            <Container>
                
                <ProfileImgSection>
                    <ProfileImg
                        source={params.avatar ? { uri: params.avatar } : IMG_DEFAULTPROFILE}
                        style={params.avatar && { width: 100, height: 100 }}
                    />
                    <CamBtn onPress={camOnPress}>
                        <CamIcon source={IC_EDITPROFILEIMG} />
                    </CamBtn>

                </ProfileImgSection>
                <SurnameSection>
                    <SurnameInput
                        value={params.firstName}
                        onChangeText={(text) => profileInfoOnChange("firstName", text)}
                        placeholder="First name" />
                </SurnameSection>
                <LastnameSection>
                    <LastnameInput
                        value={params.lastName}
                        onChangeText={(text) => profileInfoOnChange("lastName", text)}
                        placeholder="Last name" />
                </LastnameSection>
                <OrganizationSection>
                    <OrganizationInput
                        value={params.organization}
                        onChangeText={(text) => profileInfoOnChange("organization", text)}
                        placeholder="Organization" />
                </OrganizationSection>
                <AddSection>
                    {editingInfoRender("phones")}
                    <AddGroup>
                        <AddBtn onPress={() => addInfoOnPress("phones")}>
                            <AddIc source={IC_GREENADD} />
                        </AddBtn>
                        <AddText>Add phone number</AddText>
                    </AddGroup>
                </AddSection>
                <AddSection>
                    {editingInfoRender("emails")}
                    <AddGroup>
                        <AddBtn onPress={() => addInfoOnPress("emails")}>
                            <AddIc source={IC_GREENADD} />
                        </AddBtn>
                        <AddText>Add email</AddText>
                    </AddGroup>
                </AddSection>
                <AddSection>
                    {editingInfoRender("addresses")}
                    <AddGroup>
                        <AddBtn onPress={() => addInfoOnPress("addresses")}>
                            <AddIc source={IC_GREENADD} />
                        </AddBtn>
                        <AddText>Add address</AddText>
                    </AddGroup>
                </AddSection>
                <AddSection style={{ borderBottomWidth: params.birthday.length == 0 ? 0.5 : 0 }}>
                    {editingInfoRender("birthday")}
                    {params.birthday.length == 0 ? (
                        <AddGroup>
                            <AddBtn onPress={() => addInfoOnPress("birthday")}>
                                <AddIc source={IC_GREENADD} />
                            </AddBtn>
                            <AddText>Add birthday</AddText>
                        </AddGroup>
                    ) : null}

                </AddSection>
            </Container>
            <Toast config={toastConfig} />
        </>
    )
}

export default memo(AddItemContact)

const Container = styled.ScrollView`
    background-color: #FFFFFF;
    display: flex;
    flex: auto;
    padding: 0px 16px;
`
const HeaderSection = styled.View`
background-color: #FFFFFF;
    padding: 0px 16px;
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

    color: ${(props) => props.isValid.fullName && props.isValid.phone ? '#F2A54A' : '#828282'} ;
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
    flex:auto;
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