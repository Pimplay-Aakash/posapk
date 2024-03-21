
import {View, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {createOrder} from '../../redux/slice/customerSlice';

// const valuePass=()=>{

// }

const Cash = () => {
  const routdata = useRoute();
  console.log("route value",routdata.params.total);
  console.log("route user",routdata.params.user);
  const navigation = useNavigation();

  const handleGoToCash = () => {
    navigation.goBack();
  };
  const dispatch = useDispatch();

  const handleOrder = (payment) => {
    const total =  routdata.params.total
    const user =  routdata.params.user
    const items = routdata.params.items
    const orderData = {paymentMethod: payment , totolPrice:total , user:user,items:items}
    console.log("sending data of order",orderData)
    dispatch(createOrder(orderData));
    // dispatch(emptyCart())
    navigation.navigate('Share',{data:orderData});
  };

  const [Isloading, setIsloadig] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsloadig(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 40,
        }}>
        <Text>
          {' '}
          <AntDesign
            name="close"
            size={30}
            color="blue"
            onPress={handleGoToCash}
          />
        </Text>
        <Text style={{fontSize: 16, fontWeight: 600,color:"black"}}>Mark unpaid</Text>
      </View>
      <View
        style={{
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
          marginVertical: 8,
          color: 'white',
        }}
      />
      {Isloading ? (
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 16,
            color:"black"
          }}>
          Loading ........
        </Text>
      ) : (
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <Text style={{fontWeight: 600, fontSize: 17,color:"black"}}>
            {' '}
            ₹ {routdata.params.total}.00
          </Text>
          <Text style={{fontSize: 14, fontWeight: 500,color:"black"}}>
            Select Payment Option
          </Text>
        </View>
      )}
      <View
        style={{
          border: '.5px solid gray',
          margin: 15,
          flexDirection: 'column',
          gap: 20,
          padding: 15,
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => handleOrder("CASH")}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="cash" size={24} color="black" />

            <Text
              style={{padding: 8, fontSize: 14, fontWeight: 500,color:"black"}}
              >
              Cash
            </Text>
          </View>
          <AntDesign name="right" size={20} color="black" />
        </Pressable>
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            marginVertical: 8,
            color: 'white',
          }}
        />
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => handleOrder("UPI")}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="cash" size={24} color="black" />
            <Text style={{padding: 8, fontSize: 14, fontWeight: 500,color:"black"}}>Upi</Text>
          </View>
          <AntDesign name="right" size={20} color="black" />
        </Pressable>
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            marginVertical: 8,
            color: 'white',
          }}
        />
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor:'gray',
          }} 
          // onPress={handleOrder}
          >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name="cash" size={24} color="black" />
            <Text style={{padding: 8, fontSize: 14, fontWeight: 500,color:"black"}}>
              Split Payment
            </Text>
          </View>
          <AntDesign name="right" size={20} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default Cash;
