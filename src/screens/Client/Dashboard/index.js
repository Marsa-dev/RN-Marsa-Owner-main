import { View, Text, Image, Alert, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './style'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
import { LOGIN_SCREEN } from '../../constants/Navigators';
import images from '../../../assets/images/images';

import DashboardHeader from '../../../component/DashboardHeader';
import SearchBar from '../../../component/SearchBar';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import fontsSize from '../../../assets/fontsSize/fontsSizes';
import FloatButton from '../../../component/FloatButton';
import icons from '../../../assets/icons/icons';
import BoatCard from '../../../component/BoatCard';
import { BOAT_DETAIL_SCREEN, PROFILE_INFO_SCREEN } from '../../../constants/Navigators';
import { useSelector } from 'react-redux';
import Config from '../../../../utils/config';
import FastImage from 'react-native-fast-image';
const Dashboard = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const user = useSelector(state=> state.data.user)
  const [search, setSearch] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const slider = useSelector(state=>state.data.slider)
  const boats = useSelector(state=>state.data.boats)
  useEffect(()=>{
    if(isFocused){
      setSearch(null)
    }
  },[isFocused])
  const handleSearchQueryChange = (query) => {
    setSearch(query);
    filterData(query);
  };
  const filterData = (query) => {
    const filteredItems = boats?.filter((item) => {
      // Customize the conditions for filtering based on your requirements
      return item.craftName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredData(filteredItems);
  };
  const boatsData = search ? filteredData : boats
  return (
    <View style={styles.container}>
      <DashboardHeader 
        title={`Hi ${user?.fullName}`}
        subTitle = "Discover-take your travel to next level"
        image={icons.profileImage}
        onPress={()=> navigation.navigate(PROFILE_INFO_SCREEN)}
        // icon
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar
          value={search}
          onChangeText={handleSearchQueryChange}
        />
        <View style={styles.swiperContainer}>
          <Swiper 
            activeDotColor={colors.primaryColor}
            dotColor={colors.white}
          >
            {slider?.map((item, index) => {
              return (
                <FastImage
                  source={{
                    uri: Config.BASE_URL + item?.images[0],
                    priority: FastImage.priority.normal,
                  }}
                  key={index}
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={styles.sliderTitle}>
                    {item?.craftName}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={styles.sliderDescription}>
                    {`${item?.loa} feet/ ${item?.guestCapicty} guest`}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={styles.sliderDescription}>
                    {`$${item?.rentPerHour} per hour`}
                  </Text>

                  <FloatButton
                    text={'Book Now'}
                    bottom={hp(2.1)}
                    left={wp(4)}
                    borderRadius={wp(2)}
                    buttonColor={colors.primaryColor}
                    onPress={() => navigation.navigate(BOAT_DETAIL_SCREEN, {
                      data: item
                    })
                    }
                  />
                  {
                    user?.wishlist?.find((wish) => wish === item?._id) ?
                      <TouchableOpacity style={styles.sliderHeartButton}>
                        <Image
                          source={icons.redHeart}
                          style={styles.sliderHeartImage}
                        />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.sliderHeartButton}>
                        <Image
                          source={icons.heart}
                          style={styles.sliderHeartImage}
                        />
                      </TouchableOpacity>
                  }
                </FastImage>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.cardHeading}>
          <Text style={styles.headingTitle}>Popular Boats</Text>
          <TouchableOpacity>
            <Text style={styles.headingLink}>View all</Text>
          </TouchableOpacity>
        </View>
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
                  image={item?.images[1]}
                  title={item?.craftName}
                  price={item?.rentPerHour}
                  vendor
                  iconPress={()=> Alert.alert('Favourite icon press')}
                  favourite={user?.wishlist?.find((wish)=> wish === item?._id)}
                />
              </TouchableOpacity>
            ))

          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Dashboard