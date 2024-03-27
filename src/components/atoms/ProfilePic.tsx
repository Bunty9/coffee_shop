import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../../theme/theme';

const ProfilePic = () => {
  return (
    <View style={styles.imagecontainer}>
      <Image
        source={require('../../assets/app_images/avatar.jpg')}
        style={styles.image}
      />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  imagecontainer: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: SPACING.space_12,
    backgroundColor: COLORS.secondaryDarkGreyHex,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: SPACING.space_36,
    height: SPACING.space_36,
  },
});
