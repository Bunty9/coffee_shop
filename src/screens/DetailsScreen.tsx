import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {COLORS} from '../theme/theme';

const DetailsScreen = ({route}: any) => {
  const ItemofIndex = useStore(state =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeansList,
  )[route.params.index];

  console.log(ItemofIndex);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewStyles}>
        <Text style={styles.text}>DetailsScreen</Text>
        <Text style={styles.text}>{JSON.stringify(ItemofIndex)}</Text>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

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
