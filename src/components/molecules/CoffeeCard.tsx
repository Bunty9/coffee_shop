import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../atoms/CustomIcon';
import BGIcon from '../atoms/BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;
const CARD_HEIGHT = Dimensions.get('window').height * 0.11;

interface CoffeeCardPorps {
  id: string;
  index: number;
  name: string;
  type: string;
  roasted: string;
  imagelink_square: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: (id: string) => void;
}

const CoffeeCard: React.FC<CoffeeCardPorps> = ({
  id,
  index,
  name,
  type,
  roasted,
  imagelink_square,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0.2}}
      end={{x: 1, y: 0.8}}
      style={styles.cardLinearGradient}
      colors={[COLORS.primaryDarkGreyHex, COLORS.secondaryBlackRGBA]}>
      <ImageBackground
        source={imagelink_square}
        style={styles.cardImageBackground}
        resizeMode="cover">
        <View style={styles.cardRatingContainer}>
          <CustomIcon name="star" color={COLORS.primaryOrangeHex} size={15} />
          <Text style={styles.cardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardName}>{name}</Text>
      <Text style={styles.cardSpecialIngredient}>{special_ingredient}</Text>
      <View style={styles.cardFooterRow}>
        <Text style={styles.cardPrice}>
          $ <Text>{price.price}</Text>
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name="plus"
            size={24}
            BGColor={COLORS.primaryOrangeHex}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  cardLinearGradient: {
    marginHorizontal: SPACING.space_10,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_8,
    backgroundColor: COLORS.primaryDarkGreyHex,
    color: COLORS.primaryWhiteHex,
  },
  cardImageBackground: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BORDERRADIUS.radius_8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    paddingHorizontal: SPACING.space_10,
    borderBottomLeftRadius: BORDERRADIUS.radius_10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  cardRatingText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_light,
    marginLeft: SPACING.space_4,
  },
  cardName: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_light,
    marginTop: SPACING.space_2,
  },
  cardSpecialIngredient: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_light,
    marginTop: SPACING.space_2,
  },
  cardPrice: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    marginTop: SPACING.space_2,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
