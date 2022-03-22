import React, { memo } from "react";
import { Platform, StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { IC_BACK, IC_CALL, IC_EDITPROFILEIMG, IMG_PROFILE } from "../assets";

const ItemContact = ({ navigation }) => {
    const insets = useSafeAreaInsets()
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
                    <EditBtn>
                        <EditText>Edit</EditText>
                    </EditBtn>
                </HeaderSection>
                <InfoSection>
                    <ProfileImgSection>
                        <ProfileImg source={IMG_PROFILE} />
                        <CamIcon source={IC_EDITPROFILEIMG} />
                    </ProfileImgSection>
                    <ProfileText>Nguyen Le Hoang</ProfileText>
                    <ProfileSubText>Mobile Dev</ProfileSubText>
                </InfoSection>
                <FeatureSection>
                    <ItemFeature>
                        <ItemFeatureIcBg>
                            <ItemFeatureIc source={IC_CALL}/>
                        </ItemFeatureIcBg>
                        <ItemFeatureText>Call</ItemFeatureText>
                    </ItemFeature>
                    <ItemFeature>
                        <ItemFeatureIcBg>
                            <ItemFeatureIc source={IC_CALL}/>
                        </ItemFeatureIcBg>
                        <ItemFeatureText>Call</ItemFeatureText>
                    </ItemFeature>
                    <ItemFeature>
                        <ItemFeatureIcBg>
                            <ItemFeatureIc source={IC_CALL}/>
                        </ItemFeatureIcBg>
                        <ItemFeatureText>Call</ItemFeatureText>
                    </ItemFeature>
                    <ItemFeature>
                        <ItemFeatureIcBg>
                            <ItemFeatureIc source={IC_CALL}/>
                        </ItemFeatureIcBg>
                        <ItemFeatureText>Call</ItemFeatureText>
                    </ItemFeature>
                </FeatureSection>
            </Section1>
            <PhoneSection>
                <PhoneTitle>Phone number</PhoneTitle>
                <PhoneNumber>0123456789</PhoneNumber>
            </PhoneSection>
            <NoteSection>
                <NoteTitle>Note</NoteTitle>
                <NoteContext></NoteContext>
            </NoteSection>
            <SendMessageBtn>
                <SendMessageText>Send message</SendMessageText>
            </SendMessageBtn>
            <DeleteBtn>
                <DeleteText>Delete Contact</DeleteText>
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
const EditBtn = styled.View`
    
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
`
const ProfileImg = styled.Image`
    height: 100px;
    width: 100px;
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
const ItemFeatureIcBg = styled.View`
    background-color: #F2A54A;
    padding: 10px;
    border-radius: 100px;
`
const ItemFeatureIc = styled.Image`
    height: 18px;
    width: 18px;
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