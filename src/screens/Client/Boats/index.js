import { View, Text, Image, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './style'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import images from '../../../assets/images/images';
import SearchBar from '../../../component/SearchBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import icons from '../../../assets/icons/icons';
import BoatCard from '../../../component/BoatCard';
import { BOAT_DETAIL_SCREEN } from '../../../constants/Navigators';
import Header from '../../../component/Header';
import { useSelector } from 'react-redux';
const Boats = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const data = useSelector(state=>state.data.boats)
  const user = useSelector(state=>state.data.user)
  useEffect(() => {
    if (isFocused) {
      setSearch(null)
    }
  }, [isFocused])
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
  return (
    <View style={styles.container}>
      <Header
        title={'Boats'}
        leftIcon={icons.backArrow}
        leftIconPress={()=> navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal:wp(4)}}>
          <SearchBar
            onChangeText={handleSearchQueryChange}
            value={search}
          />
          <View style={styles.cardContainer}>
            {
              data.length > 0 ?
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
                    favourite={user?.wishlist?.find((wish)=> wish === item?._id)}
                  />
                </TouchableOpacity>
              ))
              :
              <Text style={styles.emptyText}>There is not boats</Text>
            }
          </View>
        </View>  
      </ScrollView>
    </View>
  )
}

export default Boats