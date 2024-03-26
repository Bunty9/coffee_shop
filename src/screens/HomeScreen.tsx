import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  data.forEach((item: any) => {
    if (temp[item.name] === undefined) {
      temp[item.name] = item.name;
    } else {
      temp[item.name] = item.name;
    }
  });
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeListByCategory = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  }
  return data.filter((item: any) => item.name === category);
};

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffeeList, setSortedCoffeeList] = useState(
    getCoffeeListByCategory(categoryIndex.category, CoffeeList),
  );

  console.log('sortedCoffeeList', sortedCoffeeList.length);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewStyles}>
        <HeaderBar title="Home" />
        <Text style={styles.screenTitle}>
          Find the Best {'\n'}coffee for you
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Find your Coffee"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={() => {}}>
            <CustomIcon
              name="search"
              size={FONTSIZE.size_24}
              color={
                searchText.length > 0
                  ? COLORS.primaryWhiteHex
                  : COLORS.primaryLightGreyHex
              }
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categogyScrollViewStyle}>
          {categories.map((item, index) => (
            <View
              key={index}
              style={[
                styles.categoryContainer,
                {
                  backgroundColor:
                    categoryIndex.index === index
                      ? COLORS.secondaryBlackRGBA
                      : COLORS.primaryDarkGreyHex,
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setCategoryIndex({index: index, category: categories[index]});
                  setSortedCoffeeList([
                    ...getCoffeeListByCategory(categories[index], CoffeeList),
                  ]);
                }}>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        categoryIndex.index === index
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollviewStyles: {
    flexGrow: 1,
  },
  screenTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    paddingLeft: SPACING.space_10,
    // fontWeight: 'bold',
    // marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: BORDERRADIUS.radius_8,
    backgroundColor: COLORS.primaryDarkGreyHex,
    color: COLORS.primaryWhiteHex,
    margin: SPACING.space_10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.primaryWhiteHex,
    paddingHorizontal: SPACING.space_15,
    textAlignVertical: 'center',
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_2,
  },
  inputIcon: {
    marginRight: SPACING.space_10,
  },
  categogyScrollViewStyle: {
    paddingLeft: SPACING.space_10,
    alignItems: 'center',
    height: SPACING.space_44,
  },
  categoryContainer: {
    borderRadius: BORDERRADIUS.radius_8,
    marginRight: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
  },
  categoryText: {
    color: COLORS.primaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    paddingTop: SPACING.space_2,
  },
});
