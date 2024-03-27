import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BORDERRADIUS, SPACING} from '../../theme/theme';
import CustomIcon from './CustomIcon';

interface BGIconProps {
  name: string;
  color: string;
  size: number;
  BGColor: string;
}

const BGIcon: React.FC<BGIconProps> = ({name, color, size, BGColor}) => {
  return (
    <View style={[styles.iconBG, {backgroundColor: BGColor}]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  iconBG: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SPACING.space_24,
    width: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_8,
  },
  icon: {},
});
