import React, { memo, useCallback, useEffect, useState } from "react";
import { Platform, StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { IC_BACK, IC_CALL, IC_EDITPROFILEIMG, IMG_PROFILE, IMG_DEFAULTPROFILE, IC_MESSAGE, IC_FACETIME, IC_EMAIL } from "../assets";
import { deleteContactAction, useContacts } from "../store";
import { RawContact } from "../types";

const featureItems = [
    { icon: IC_CALL, text: "Call", typeInfo: "phones"},
    { icon: IC_MESSAGE, text: "Message",typeInfo: "phones"},
    { icon: IC_FACETIME, text: "Call", typeInfo: "phones"},
    { icon: IC_EMAIL, text: "Email", typeInfo: "emails" },
]

const FeatureItem = ({ icon, text, available }:{icon:any, text: string, available: boolean}) => (
    <ItemFeature>
        <ItemFeatureIcBg available={available}>
            <ItemFeatureIc available={available} text={text} source={icon} />
        </ItemFeatureIcBg>
        <ItemFeatureText>{text}</ItemFeatureText>
    </ItemFeature>
)

const ItemContact = ({ navigation, route }) => {
    const insets = useSafeAreaInsets()
    const contacts = useContacts()
    const dispatch = useDispatch()
    const [itemContact, setItemContact] = useState<RawContact>({
        id: "",
        firstName: "",
        lastName: "",
        organization: "",
        phones: [],
        emails: [],
        addresses: [],
        birthday: [],
        avatar: "",
    })
    const [isMounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted) {
            setItemContact(contacts.find(item => item?.id == route.params?.id))
        }
    }, [contacts, JSON.stringify(itemContact), route.params.id, isMounted])

    const deleteMessage = useCallback(() => {
        navigation.navigate("Contact")
        dispatch(deleteContactAction(itemContact?.id))
    }, [JSON.stringify(itemContact)])

    const onEditPress = useCallback(() => {
        console.log(itemContact.id)
        navigation.navigate("EditContact", { id: itemContact.id })
    }, [JSON.stringify(itemContact)])

    return (
        <>
        <View style={{
            backgroundColor: "#FFFFFF",
            height: Platform.OS == "ios" ? insets.top : StatusBar.currentHeight+16,
        }}>
            <BackgroundColor></BackgroundColor>
        </View>
        <Container>
            <Section1>
                <BackgroundColor></BackgroundColor>
                <HeaderSection>
                    <BackBtn onPress={() => navigation.goBack()}>
                        <BackIc source={IC_BACK} />
                    </BackBtn>
                    <EditBtn onPress={onEditPress}>
                        <EditText>Edit</EditText>
                    </EditBtn>
                </HeaderSection>
                <InfoSection>
                    <ProfileImgSection>
                        <ProfileImg 
                            source={itemContact?.avatar ? { uri: itemContact.avatar } : IMG_DEFAULTPROFILE}
                            style={itemContact?.avatar && { width: 100, height: 100 }} />
                        <CamIcon source={IC_EDITPROFILEIMG} />
                    </ProfileImgSection>
                    <ProfileText>{itemContact?.firstName} {itemContact?.lastName}</ProfileText>
                        <ProfileSubText>{itemContact?.organization}</ProfileSubText>
                </InfoSection>
                <FeatureSection>
                    {featureItems.map((item, key) => (
                        <FeatureItem
                            available={itemContact[item.typeInfo]?.length}
                            icon={item.icon} text={item.text}
                            key={key} 
                        />
                    ))}
                </FeatureSection>
            </Section1>
            <PhoneSection>
                <PhoneTitle>Phone number</PhoneTitle>
                <PhoneNumber>{itemContact?.phones[0]}</PhoneNumber>
            </PhoneSection>
            <NoteSection>
                <NoteTitle>Note</NoteTitle>
                <NoteContext></NoteContext>
            </NoteSection>
            <SendMessageBtn>
                <SendMessageText>Send message</SendMessageText>
            </SendMessageBtn>
            <DeleteBtn>
                <DeleteText onPress={deleteMessage}>Delete Contact</DeleteText>
            </DeleteBtn>
        </Container>
        </>
        
    )
}

export default memo(ItemContact)

const Container = styled.View`
    background-color: #FFFFFF;
    display: flex;
    height: 100%;
`
const Section1 = styled.View`
    padding: 0 16px;
`
const BackgroundColor = styled.View`
    position: absolute;
    background: #F2A54A;
    opacity: 0.05;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`
const HeaderSection = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const BackBtn = styled.TouchableOpacity`
    height: 28px;
    width: 28px;
`
const BackIc = styled.Image`
    
`
const EditBtn = styled.TouchableOpacity`
    
`
const EditText = styled.Text`
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height, or 122% */

    text-align: right;
    letter-spacing: -0.41px;

    color: #F2A54A;
`
const InfoSection = styled.View`
    align-items: center;
    
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
const CamIcon = styled.Image`
    position: absolute;
    bottom: 0;
    right: 0;
`
const ProfileText = styled.Text`
    margin-top: 20px;

    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height, or 122% */

    letter-spacing: -0.41px;

    /* Gray 1 */

    color: #333333;
`
const ProfileSubText = styled.Text`
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    /* identical to box height, or 169% */

    letter-spacing: -0.41px;

    /* Gray 3 */

    color: #828282;
`
const FeatureSection = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 48px 10px 48px;
`
const ItemFeature = styled.TouchableOpacity`
    align-items: center;
`
const ItemFeatureIcBg = styled.View<{available?:boolean}>`
    background-color: ${props => props.available ? "#F2A54A" : "#FFFFFF"};
    border: ${props=>props.available?'0':'0.5px'} solid #BDBDBD;
    /* padding: 10px; */
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
`
const ItemFeatureIc = styled.Image<{text?:string, available?:boolean}>`
    height: ${props => props.text == "Message"? '18px': '24px'};
    width: ${props => props.text == "Message" ? '18px' : '24px'};
    tint-color: ${props => props.available ? '#FFFFFF' : '#DADADA;'}
`
const ItemFeatureText = styled.Text`
    margin-top: 5px;
    font-weight: 400;
    font-size: 11px;
    line-height: 22px;
    /* identical to box height, or 200% */

    letter-spacing: -0.41px;

    color: #F2A54A;
`
const PhoneSection = styled.View`
    margin: 0 16px;
    padding: 9px 0;
    border-bottom-width: 0.5px;
    border-bottom-color: solid rgba(0, 0, 0, 0.1);
`
const PhoneTitle = styled.Text`
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    /* identical to box height, or 169% */

    letter-spacing: -0.41px;

    /* Gray 1 */

    color: #333333;
`
const PhoneNumber = styled.Text`
    margin-top: 5px;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    /* identical to box height, or 129% */

    letter-spacing: -0.41px;

    /* Blue 1 */

    color: #2F80ED;
`
const NoteSection = styled(PhoneSection)``
const NoteTitle = styled(PhoneTitle)``
const NoteContext = styled(PhoneNumber)``
const SendMessageBtn = styled.TouchableOpacity`
    margin: 0 16px;
    padding: 14px 0 8px 0;
    border-bottom-width: 0.5px;
    border-bottom-color: solid rgba(0, 0, 0, 0.1);
`
const SendMessageText = styled.Text`
    
`
const DeleteBtn = styled(SendMessageBtn)``
const DeleteText = styled(SendMessageText)`
    color: #FF4A4A;
`