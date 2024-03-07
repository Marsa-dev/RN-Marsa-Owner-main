import { View,Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './style'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import SearchBar from '../../../component/SearchBar';

import icons from '../../../assets/icons/icons';
import BoatCard from '../../../component/BoatCard';
import { BOAT_DETAIL_SCREEN } from '../../../constants/Navigators';
import Header from '../../../component/Header';
import { getListDataAfterLogin } from '../../../api/Httpservice';
const Wishlist = () => {
  const navigation = useNavigation();
  const isFocused =useIsFocused();
  const [search, setSearch] = useState(null)
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([])

  useEffect(()=>{
    if(isFocused){
      setSearch(null)
      getWishList()
    }
  },[isFocused])
  const handleSearchQueryChange = (query) => {
    setSearch(query);
    filterData(query);
  };
  const filterData = (query) => {
    const filteredItems = data?.filter((item) => {
      // Customize the conditions for filtering based on your requirements
      return item?.craftName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredData(filteredItems);
  };
  const boatsData = search ? filteredData : data
  const getWishList = async()=>{
    const res = await getListDataAfterLogin('user/wishList');
    // console.log('res', res)
    if (res?.success){
      setData(res?.data)
    }
  }
  return (
    <View style={styles.container}>
      <Header
        title={'Wishlist'}
        leftIcon={icons.backArrow}
        leftIconPress={()=> navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar
          onChangeText={handleSearchQueryChange}
          value={search}
        />
        <View style={styles.cardContainer}>
          {
            boatsData?.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate(BOAT_DETAIL_SCREEN, {
                  data: item
                })}
                key={index.toString()}
                style={styles.card}>
                <BoatCard 
                  image={item?.images[0]}
                  title={item?.craftName}
                  price={item?.rentPerHour}
                  iconPress={()=> Alert.alert('Favourite icon press')}
                  favourite
                />
              </TouchableOpacity>
            ))

          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Wishlist