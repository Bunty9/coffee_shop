import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/molecules/HeaderBar';
import CustomIcon from '../components/atoms/CustomIcon';
import CoffeeCard from '../components/molecules/CoffeeCard';

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

const HomeScreen = ({navigation}: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeansList = useStore((state: any) => state.BeansList);

  const ListRef = useRef<FlatList | null>(null);

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

  // console.log('sortedCoffeeList', sortedCoffeeList.length);
  const tabBarHeight = useBottomTabBarHeight();

  const coffeecardButtonPressHandler = (item: any) => {
    console.log('coffeecardButtonPressHandler', item.id);
    navigation.navigate('Details', {
      id: item.id,
      index: item.index,
      type: item.type,
    });
  };

  const beanscardButtonPressHandler = (item: any) => {
    console.log('beanscardButtonPressHandler', item.id);
    navigation.navigate('Details', {
      id: item.id,
      index: item.index,
      type: item.type,
    });
  };

  const searchCoffee = (search: string) => {
    if (search !== '') {
      ListRef.current?.scrollToOffset({animated: true, offset: 0});
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffeeList([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };
  const resetSearchCoffee = () => {
    ListRef.current?.scrollToOffset({animated: true, offset: 0});
    setSearchText('');
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffeeList([...CoffeeList]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewStyles}>
        <HeaderBar title="Coffee" />
        <Text style={styles.screenTitle}>
          Find the Best {'\n'}coffee for you
        </Text>
        {/* Search Box Container */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Find your Coffee"
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.searchInput}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity onPress={() => resetSearchCoffee()}>
              <CustomIcon
                name="x"
                size={FONTSIZE.size_18}
                color={COLORS.primaryLightGreyHex}
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
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

        {/* Category ScrollView */}
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
                  ListRef.current?.scrollToOffset({animated: true, offset: 0});
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

        {/* Coffee Cards */}
        <FlatList
          horizontal={true}
          ref={ListRef}
          ListEmptyComponent={
            <View style={styles.emptyCoffeeContainer}>
              <CustomIcon name="meh" color={COLORS.primaryWhiteHex} size={25} />
              <Text style={styles.emptyCoffeeText}>No Coffee Found</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffeeList}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => coffeecardButtonPressHandler(item)}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  name={item.name}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />

        {/* Coffee Beans Cards*/}
        <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={BeansList}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={[
            styles.flatListContainer,
            {marginBottom: tabBarHeight},
          ]}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => beanscardButtonPressHandler(item)}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  name={item.name}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />
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
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    height: 200,
  },
  coffeeBeansTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    paddingLeft: SPACING.space_10,
    marginVertical: SPACING.space_10,
  },
  emptyCoffeeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCoffeeText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_light,
  },
});
