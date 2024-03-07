import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import icons from '../assets/icons/icons';
import colors from '../assets/colors/colors';
import fontsSize from '../assets/fontsSize/fontsSizes';
import fonts from '../assets/fonts/fonts';

const Calander = ({dateData}) => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [daysArray, setDaysArray] = useState([]);
  const [selected, setSelected] = useState(0)

  // Function to update the current date and days in the month
  const updateDateAndDays = () => {
    setCurrentDate(currentMonth);

    // Calculate the number of days in the current month
    const daysInCurrentMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    setDaysInMonth(daysInCurrentMonth);

    // Generate an array of day objects for the current month
    const days = [];
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      days.push({
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
      });
    }
    setDaysArray(days);
  };

  // Use useEffect to update the date and days when the component mounts and when the current month changes
  useEffect(() => {
    updateDateAndDays();
  }, [currentMonth]);

  // Function to handle moving to the next month
  const handleNextMonth = () => {
    setSelected(-1)
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Function to handle moving to the previous month
  const handlePrevMonth = () => {
    setSelected(-1)

    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  // Render each day item in the FlatList
  const renderDayItem = ({ item, index }) => {
    const formattedDateData = dateData.map((date) => moment(date).format('YYYY-MM-DD'));

    const isDateSelected = formattedDateData?.includes(moment(item.date).format('YYYY-MM-DD'));
    const isCurrentDate = moment(item.date).isSame(moment(), 'day');
    return (
      <TouchableOpacity
        disabled
        style={{
          padding: wp(2),
          height: hp(8),
          width: wp(12),
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isCurrentDate ? colors.primaryColor : 'rgba(16, 31, 87, 0.25)',
          marginHorizontal: wp(1),
          borderRadius: wp(2),
          marginRight: daysArray?.length - 1 === index ? wp(8) : null
        }}
      >
        <Text style={{ color: isCurrentDate === index ? colors.white : isCurrentDate ? colors.white : colors.primaryColor }}>
          {moment(item.date).format('D')}
        </Text>
        <Text style={{ color: isCurrentDate === index ? colors.white : isCurrentDate ? colors.white : colors.primaryColor }}>
          {moment(item.date).format('ddd')}
        </Text>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {isDateSelected && (
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.primaryColor
              }}
            ></View>
          )}
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={{paddingVertical:hp(2)}}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: wp(4)

        }}
      >
        <TouchableOpacity onPress={handlePrevMonth}>
          <Image
            source={icons.forwardIcon}
            style={{
              transform: [{ rotate: '180deg' }],
              width: wp(4),
              height: wp(4),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <Text style={{
          color:colors.primaryColor,
          fontSize:fontsSize.px_14,
          fontWeight:'500',
          fontFamily:fonts.regular
        }}>{moment(currentDate).format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Image
            source={icons.forwardIcon}
            style={{
              width: wp(4),
              height: wp(4),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop:hp(2), marginLeft:wp(4)}}
        data={daysArray}
        renderItem={renderDayItem}
        keyExtractor={(item) => item.date.toDateString()}
        horizontal={true} // Display days horizontally
      />
    </View>
  );
};

export default Calander;
