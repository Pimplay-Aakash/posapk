import React, {useState} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
// import {Entypo} from '@expo/vector-icons';
import styles from './styles';

const Share = () => {
  const [show, setshow] = useState(false);

  const navigation = useNavigation();
  // const [reloadScreen, setReloadScreen] = useState(false); // State to trigger screen reload
  const route = useRoute();
  const user = route.params.userData;
  console.log('user details: ' + user);
  // const handleOkClick = () => {
  //   setshowShare(true);
  // };

  // const goToOrders = () => {
  //   navigation.navigate("Orders");
  // };

  const goToHome = () => {
    navigation.navigate('Home');
    setshow(false);
    // setReloadScreen(true);
  };
  const HandleShare = () => {
    setshow(true);
  };

  return (
    // <View style={[styles.wrapper]}>
    <View style={[styles.container, {position: 'relative'}]}>
      <Text style={[styles.boldText, styles.dark, styles.shadow]}>
        Paid sucessfully
      </Text>
      <View style={[styles.btns]}>
        <Pressable style={[styles.bgLight, styles.btn]} onPress={goToHome}>
          <Text style={[styles.dark, styles.font]}>Ok</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.bgDark]} onPress={HandleShare}>
          {/* <Entypo name="share" size={20} color="#d8f3dc" /> */}
          <Text style={[styles.light, styles.font]}>Share</Text>
        </Pressable>

        {/* <TextInput
       style={{
         border: ".5px solid gray",
         padding: 6,

         flexDirection: "column",
       }}
       placeholder="please Enter your phone number"
     ></TextInput> */}
      </View>
      {show && (
        <View
          style={[
            styles.bgLight,
            styles.shadow,
            {padding: 10, position: 'absolute', width: 350, height: 350 ,left:'50%', top:'50%'
          
          
          },
          ]}>
          <Text style={[styles.semiBoldText, styles.dark, styles.shadow]}>
            Successfullu Shared
          </Text>

          <Pressable
            style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}}
            onPress={goToHome}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
              OK
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Share;
