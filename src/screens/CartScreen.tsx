import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewStyles}>
        <Text style={styles.text}>Cart Screen</Text>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollviewStyles: {
    flexGrow: 1,
  },
  text: {
    color: COLORS.primaryWhiteHex,
  },
});
