import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../../component/Header';
import icons from '../../../assets/icons/icons';
import SearchBar from '../../../component/SearchBar';
import Button from '../../../component/Button';
import colors from '../../../assets/colors/colors';
import BookingBoardCard from '../../../component/BookingBoatCard';
import BookingPastCard from '../../../component/BookingPastCard';
import { BOOKING_DETAIL_SCREEN, PAYMENT_METHODS } from '../../../constants/Navigators';
import { getListDataAfterLogin } from '../../../api/Httpservice';

const Bookings = () => {
  const navigation = useNavigation();
  const isFocused= useIsFocused()
  const [search, setSearch] = useState('');
  const [selectedButton, setSelectedButton] = useState('Current');// Set the default selected button
  const [currentData, setCurrentData] = useState([])
  const [pastData, setPastData] =useState([])
  const [filteredData, setFilteredData] = useState([]);

  const handleButtonPress = (buttonLabel) => {
    setSelectedButton(buttonLabel);
    setSearch('')
  };
  useEffect(()=>{2
    if(isFocused){
      setSearch('')
      getCurrentBookings()
      getPastBookings()
    }
  },[isFocused])
  const getCurrentBookings = async()=>{
    const res = await getListDataAfterLogin('booking/current')
    if(res?.success){
      // console.log('res?.data', JSON.stringify(res?.data))
      setCurrentData(res?.data)
    }
    else{
      console.log('error', res?.message)
    }
  }
  const getPastBookings = async()=>{
    const res = await getListDataAfterLogin('booking/past')
    if(res?.success){
      // console.log('res?.data past', res?.data)
      setPastData(res?.data)
    }
  }
  const renderData = selectedButton === 'Current' ? currentData : pastData;

  const handleSearchQueryChange = (query) => {
    setSearch(query);
    filterData(query);
  };
  const filterData = (query) => {
    const filteredItems = renderData?.filter((item) => {
      const craftNameMatch = item?.boatId?.craftName.toLowerCase().includes(query.toLowerCase());
      const titleMatch = item?.destination?.title.toLowerCase().includes(query.toLowerCase());

      // You can adjust the logic here based on your filtering requirements
      return craftNameMatch || titleMatch;

    });
    setFilteredData(filteredItems);
  };
  const boatsData = search ? filteredData : renderData
  return (
    <View style={styles.container}>
      <Header
        title={'My Bookings'}
        leftIcon={icons.backArrow}
        leftIconPress={() => navigation.goBack()}
      />
      <View style={{ paddingHorizontal: wp(4) }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBar onChangeText={handleSearchQueryChange} value={search} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              label={`Current(${currentData.length})`}
              width={wp(45)}
              textColor={selectedButton === 'Current' ? colors.white : colors.primaryColor}
              borderRadius={wp(8)}
              backgroundColor={selectedButton === 'Current' ? colors.primaryColor : colors.white}
              onPress={() => handleButtonPress('Current')}
              borderColor={colors.primaryColor}
              borderWidth={1}
            />
            <Button
              label={`Past(${pastData.length})`}
              width={wp(45)}
              textColor={selectedButton === 'Past' ? colors.white : colors.primaryColor}
              borderRadius={wp(8)}
              backgroundColor={selectedButton === 'Past' ? colors.primaryColor : colors.white}
              onPress={() => handleButtonPress('Past')}
              borderColor={colors.primaryColor}
              borderWidth={1}

            />
          </View>
          {
            selectedButton === 'Current' ? 
            boatsData?.map((item,index) => {
              const endTime = new Date(item?.bookingEndTime);
              const startTime = new Date(item?.bookingStartTime);

              // Calculate the time difference in milliseconds
              const timeDifferenceMilliseconds = endTime - startTime;

              // Convert the time difference to hours with minutes as decimals
              const timeDifferenceHours = timeDifferenceMilliseconds / (1000 * 60 * 60);

              return (
                <TouchableOpacity
                  key={index}
                  onPress={()=> navigation.navigate(BOOKING_DETAIL_SCREEN,{
                    data: item,
                    duration: timeDifferenceHours
                  })}
                  style={{
                    padding: wp(3),
                    borderWidth: 1,
                    borderColor: colors.placeholder,
                    borderRadius: wp(1.1),
                    marginVertical: hp(2),
                    marginBottom: index === boatsData?.length - 1 ? hp(10) : 0, 
                  }}
                >
                  <BookingBoardCard
                    image={item?.boatId?.images[0]}
                    title={item?.boatId?.craftName}
                    price={item?.totalAmount}
                    destination={item?.destination?.title}
                    date={item?.bookingEndTime}
                    time={timeDifferenceHours}
                    guest={item?.guestNo}
                    iconPress={() => alert('Favourite icon press')}
                    status={item?.status}
                  />
                  {item?.status === 'accepted' ? (
                    <Button 
                      label={'Proceed to payment'} 
                      width={wp(80)} 
                      marginTop={hp(2)}
                      height={hp(5)} 
                      onPress={() =>{navigation.navigate(PAYMENT_METHODS, {data : item})}}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            })
            :
            boatsData?.map((item, index) => {
              const endTime = new Date(item?.bookingEndTime);
              const startTime = new Date(item?.bookingStartTime);

              // Calculate the time difference in milliseconds
              const timeDifferenceMilliseconds = endTime - startTime;

              // Convert the time difference to hours with minutes as decimals
              const timeDifferenceHours = timeDifferenceMilliseconds / (1000 * 60 * 60);

              return (
                <TouchableOpacity
                  onPress={()=> navigation.navigate(BOOKING_DETAIL_SCREEN, {
                    data : item,
                    duration: timeDifferenceHours
                  })}
                  style={{
                    padding: wp(1.1),
                    borderWidth: 1,
                    borderColor: colors.placeholder,
                    borderRadius: wp(1.1),
                    marginVertical: hp(2),
                    marginBottom: index === boatsData?.length - 1 ? hp(10) : 0,
                  }}
                  key={item._id}
                >
                  <BookingPastCard
                    image={item?.boatId?.images[0]}
                    title={item?.boatId?.craftName}
                    location={item?.destination?.title}
                    date={item?.bookingEndTime}
                    time={timeDifferenceHours}
                    status={item?.status}
                  />
                  {/* {item?.status ? (
                    <Button label={'Proceed to payment'} width={wp(70)} marginTop={hp(2)} />
                  ) : null} */}
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
      </View>
    </View>
  );
};

export default Bookings;