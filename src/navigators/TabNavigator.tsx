import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';
import CustomIcon from '../components/atoms/CustomIcon';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

const Tab = createBottomTabNavigator();

const TabBarBackground = () => (
  <BlurView overlayColor="" style={styles.BlurViewStyles} blurAmount={5} />
);
const TabIcon = ({name, focused}: {name: string; focused: boolean}) => (
  <CustomIcon
    name={name}
    size={25}
    color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
  />
);
type IconProps = {focused: boolean; color: string; size: number};

const HomeTabIcon = (props: IconProps) => (
  <TabIcon name="home" focused={props.focused} />
);
const CartTabIcon = (props: IconProps) => (
  <TabIcon name="shopping-cart" focused={props.focused} />
);
const OrderHistoryTabIcon = (props: IconProps) => (
  <TabIcon name="bell" focused={props.focused} />
);
const FavouritesTabIcon = (props: IconProps) => (
  <TabIcon name="heart" focused={props.focused} />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: TabBarBackground,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: CartTabIcon,
        }}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: OrderHistoryTabIcon,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: FavouritesTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.primaryBlackRGBA,
    elevation: 0,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    height: 60,
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
