// import React, { useState } from "react";
// import { AntDesign } from "@expo/vector-icons";
// import { View, Text, Pressable, Image, ScrollView, Alert } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import { emptyCart, createOrder } from "../../redux/slice/customerSlice";
// // import { removeCart } from '../../redux/slice/Product'

// const Checkout = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const checkout = useSelector((state) => state.CustomerSlice.cart);
//   const subtotal = checkout
//     .filter((item) => item && typeof item.price === "number")
//     .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
//   const ItemAdd = checkout.length;

//   const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

//   const handleGoToCheckout = () => {
//     navigation.goBack();
//   };

//   const handleOrder = () => {
//     dispatch(createOrder({ total: subtotal }));
//   };

//   const handleGoToCash = () => {
//     if (checkout.length > 0) {
//       navigation.navigate('Cash',{value:subtotal});
//     } else {
//       setShowAlert(true); // Show alert if the cart is empty
//     }
//   };

//   const handleRemoveCart = () => {
//     dispatch(emptyCart());
//   };
// import { clearCart } from "../../redux/slice/Product";
// import { createOrder } from "../../redux/slice/customerSlice";
// import { removeCart } from '../../redux/slice/Product';

import React, {useState} from 'react';
// import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  ToastAndroid,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// import { clearCart } from "../../redux/slice/Product";
import AntDesign from 'react-native-vector-icons/AntDesign';

import {emptyCart, createOrder} from '../../redux/slice/customerSlice';
import reactNativeHTMLToPdf from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
// import {removeCart} from '../../redux/slice/Product'
// import { useState } from "react";

const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const checkout = useSelector(state => state.CustomerSlice.cart);
  // console.log("displaying data in console log while user click on checkout",checkout)
  const subtotal = checkout
    .filter(item => item && typeof item.price === 'number')
    .reduce((acc, curr) => acc + (curr.perPrice? curr.perPrice : curr.price) * curr.quantity, 0);
  const ItemAdd = checkout.length;

  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  const handleGoToCheckout = () => {
    navigation.goBack();
  };

  console.log(
    'chackout data of the cart',
    checkout.map(item => item.id),
  );
  const orderArray = checkout.map(item => {
    return {
      productId: item.id,
      quantity: item.quantity,
    };
  });

  console.log("for mutation",orderArray);

  const handleOrder = () => {
    // dispatch(createOrder({ total: subtotal, items: orderArray }));
  };

  const handleGoToCash = () => {
    if (checkout.length > 0) {
      navigation.navigate('Customers', {total: subtotal, items: orderArray});
      // dispatch(createOrder({total: subtotal, items: orderArray}));
      // navigation.navigate('Customers');
    } else {
      setShowAlert(true); // Show alert if the cart is empty
    }
  };

  const handleRemoveCart = () => {
    // dispatch(emptyCart());
  };
  // const [Generete,setGenerate]=useState(checkout)
  // console.log("cart items",Generete)
  // Generate HTML content with fetched data
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const htmlContent = `
 <html>
  <body>
    <h1 style="color: blue; font-size: 30px; font-family: Arial; text-align: center; font-weight: 600;">Synectiks Farm</h1>
    <div style="display: flex; justify-content: space-between; padding:30px">
    <div>
        <p>Customer Name: Mohammed Nadeem</p>
        <p>Phone-Number: +91-8142340247</p>
    </div>
    <div>
        <p>${currentDate}</p>
        <p>${currentTime}</p>
    </div>
</div>


    <table style="width:100%">
      <tr>
        <th>Name</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
      ${checkout.map((data, index) => {
        return `
        <tr style="text-align: center">
          <td>${index + 1}</td>
          <td><img src="${
            data.image
          }" alt="Product Image" style="width: 50px; height: 50px;"></td>
          <td>${data.name}</td>
          <td>${data.price}</td>
          <td>${data.quantity}</td>
          <td>${data.price * data.quantity}</td>
          </tr>
          `;
      })}
          <tr>
   <td colspan="6" style="text-align: right;  font-size: 20px">Subtotal: ${subtotal}</td>
   
 </tr>
    </table>

  </body>
</html>

      `;
  // <p>Tax: ${data.price}</p>

  const generatePdf = async () => {
    try {
      const options = {
        html: htmlContent,
        fileName: 'total-amount',
        directory: RNFS.DownloadDirectory, // Save in the downloads directory
      };

      const file = await reactNativeHTMLToPdf.convert(options);
      console.log(file);

      const base64String = await RNFS.readFile(file.filePath, 'base64');
      console.log('Base64 encoded string:', base64String);
      sendBills(base64String);

      // Show success message
      if (Platform.OS === 'android') {
        ToastAndroid.show('PDF downloaded successfully!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'PDF downloaded successfully!');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Show error message
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed to download PDF', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed to download PDF');
      }
    }
    // sendBills(Bill)
  };

  // ------- api fetching------
  const sendBills = async content => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      content: content,
      name: 'directory',
      phoneNumber: '9505934716',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    try {
      const response = await fetch(
        'https://2evfwh96lk.execute-api.us-east-1.amazonaws.com/sendBills',
        requestOptions,
      ); // Corrected options to requestOptions
      if (response.ok) {
        console.log('Pdf send');
      }
      if (!response.ok) {
        // throw new Error(HTTP error! Status: ${response.status});
      }
      return await response.text();
    } catch (error) {
      console.error(error);
      return null; // Return null or handle the error as needed
    }
  };

  return (
    <View
      style={{
        padding: 10,
        height: '100%',
        flex: 1,
        justifyContent: '',
        position: 'relative',
        color: 'black',
      }}>
      <View style={{marginTop: 30, marginLeft: 15}}>
        <AntDesign
          name="close"
          size={30}
          color="blue"
          onPress={handleGoToCheckout}
        />
      </View>
      <View
        style={{
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
          marginVertical: 8,
          color: 'white',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginTop: 10,
          color: 'black',
        }}>
        <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
          Cart
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 50,
            padding: 6,
            backgroundColor: 'pink',
          }}>
          <AntDesign
            onPress={handleRemoveCart}
            name="delete"
            size={18}
            color="red"
          />
        </View>
      </View>
      <ScrollView
        style={{
          marginTop: 10,
          marginBottom: 10,
          overflow: 'scroll',
          paddingTop: 10,
        }}>
        {checkout.length === 0 ? (
          <View style={{paddingHorizontal: 20}}>
            <Text style={{fontSize: 20, color: 'black'}}>
              No items available in the cart.
            </Text>
          </View>
        ) : (
          checkout.map((e, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                alignItems: 'center',
                paddingVertical: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                  position: 'relative',
                }}>
                <Image
                  source={{
                    uri: e.image,
                  }}
                  style={{width: 70, height: 70, borderRadius: 10}}
                />
                <View>
                  {!e.perPrice && (
                    <Text
                      style={{
                        width: 25,
                        height: 25,
                        position: 'absolute',
                        right: 12,
                        bottom: 17,
                        backgroundColor: 'black',
                        color: 'white',
                        padding: 3,
                        borderRadius: 40,
                        textAlign: 'center',
                      }}>
                      {e.quantity}
                    </Text>
                  )}
                </View>
                <View style={{color: 'black'}}>
                  <Text style={{fontSize: 16, color: 'black'}}>{e.name}</Text>
                  <Text style={{fontSize: 16, color: 'black'}}>Tax-exempt</Text>
                  {e.perPrice && (
                    <Text style={{fontSize: 12, color: 'black'}}> ( {e.quantity} gms )</Text>
                  )}
                </View>
              </View>
              <View style={{fontSize: 16}}>
                <Text style={{fontSize: 10, color: 'black'}}>
                  {`${
                    e.perPrice
                      ? ``
                      : `₹ ${e.price} x ${e.quantity}`
                  }`}
                </Text>
                <Text style={{color: 'black'}}>
                  ₹{' '}
                  {e.perPrice ? e.perPrice * e.quantity : e.price * e.quantity}
                </Text>
              </View>
            </View>
          ))
        )}
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, color: 'black'}}>Subtotal</Text>
        <Text style={{fontSize: 16, color: 'black'}}>₹ {subtotal}</Text>
      </View>
      <View
        style={{
          borderBottomColor: 'gred',
          borderBottomWidth: 1,
          marginVertical: 10,
          alignItems: 'center',
          marginBottom: 20,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          // backgroundColor:"red",
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 16, marginTop: 5, color: 'black'}}>Taxes</Text>
        <Text style={{fontSize: 16, color: 'black'}}>₹ 0.00</Text>
      </View>

      <View
        style={{
          color: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            fontSize: 16,
            paddingHorizontal: 15,
            marginBottom: 10,
          }}>
          <View>
            <Text style={{fontSize: 16, color: 'black'}}>Total</Text>

            <Text style={{fontSize: 16, color: 'black'}}>{ItemAdd} Item</Text>
          </View>
          <View>
            <Text style={{fontSize: 16, color: 'black'}}>₹ {subtotal}</Text>
          </View>
        </View>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: 'blue',
            borderRadius: 5,
            // marginLeft: 10
          }}
          onPress={handleGoToCash}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Checkout
          </Text>
        </Pressable>
      </View>

      {/* Alert to inform user to add items to cart */}
      {showAlert && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 20,
          }}>
          <View
            style={{backgroundColor: 'white', padding: 40, borderRadius: 10}}>
            <Text style={{fontSize: 16, marginBottom: 10, color: 'black'}}>
              Please add items to the cart before proceeding to checkout.
            </Text>
            <Pressable
              onPress={() => setShowAlert(false)}
              style={{padding: 10, backgroundColor: 'blue', borderRadius: 5}}>
              <Text style={{color: 'white', textAlign: 'center'}}>OK</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* <Pressable>
        <Text
          style={{
            color: 'white',
            backgroundColor: 'blue',
            margin: 20,
            padding: 10,
          }}
          onPress={generatePdf}>
          Generate Pdf
        </Text>
      </Pressable> */}
    </View>
  );
};

export default Checkout;
