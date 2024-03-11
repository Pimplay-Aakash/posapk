import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
// import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import styles from './styles';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Orders = () => {
  const navigation = useNavigation();
  const fetchedOrders = useSelector(state => state.CustomerSlice.orders);

  console.log('fetched orders', fetchedOrders);
  const handleOrder = order => {
    console.log('navigating to order');
    navigation.navigate('Order', {value: order});
  };
  return (
    <View style={[styles.container]}>
      <View style={{width: '100%', height: '20%'}}>
        <View
          style={[
            styles.header,
            styles.bgDark,
            styles.light,
            styles.boldText,
            styles.shadow,
          ]}>
          <Text>Orders</Text>
        </View>
        <View style={[styles.scrollLeft, styles.shadow]}>
          <View style={[styles.statusbox]}>
            <Text>Sale type : POS </Text>
            {/* <FontAwesome name="caret-down" size={18} color="#31572c" /> */}
          </View>
          <View style={[styles.statusbox]}>
            <Text>Sale Location: Synectiks</Text>
            {/* <FontAwesome name="caret-down" size={18} color="#31572c" /> */}
          </View>
        </View>
      </View>
      <ScrollView style={[styles.scrollbar]}>
        {console.log('in scrool')}

        {fetchedOrders.map((order, index) => {
          return (
            <Pressable
              style={[styles.box, styles.shadow]}
              key={index}
              onPress={() => handleOrder(order)}>
              <View style={[{flex: 1}, styles.gap]}>
                <Text style={{fontWeight: 500, fontSize: 16, color: 'gray'}}>
                  {order.createdAt}
                </Text>
                <View style={[styles.border]}></View>
                <View style={[styles.gap]}>
                  <Text style={{fontSize: 16}}>
                    #{order.__typename}order type
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#31572c',
                      flex: 1,
                      fontWeight: '700',
                    }}>
                    {/* <FontAwesome name="rupee" size={18} color="#31572c" style={{ marginRight: 5 }} /> */}
                    {order.totalPrice}
                    orderd price
                  </Text>
                </View>
                <View style={[styles.arrowbox, {margin: 5}]}>
                  <Text>No Customer </Text>
                  {/* <FontAwesome5 name="angle-right" size={26} color="black" /> */}
                </View>
              </View>
              <View style={[styles.status]}>
                <View style={[styles.statusbox]}>
                  {/* <FontAwesome
                      name="circle"
                      size={18}
                      color="#31572c"
                    /> */}
                  <Text style={{marginLeft: 5}}>paid</Text>
                </View>
                <View style={[styles.statusbox]}>
                  {/* <FontAwesome name="circle" size={18} color="#31572c" /> */}
                  <Text style={{marginLeft: 5}}>Fullfilled</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
        {console.log('scrool ended')}
      </ScrollView>
    </View>
  );
};

export default Orders;
