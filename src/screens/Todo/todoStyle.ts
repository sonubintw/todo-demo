import { StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
import { fonts } from "../../themes/fonts";
import { fontSizes } from "../../global/fontSize";

export const todoStyles = StyleSheet.create({
  heading: {
    fontSize: fontSizes.md,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  inputContent: {
    fontSize: fontSizes.md,
    color: colors.card,
    fontFamily: fonts.regular,
  },
  helper: {
    fontSize: fontSizes.xs,
    color: colors.error,
    fontFamily: fonts.regular,
  },
  btn: {
    height: 44,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardBlack,
  },
  btnText: {
    fontSize: fontSizes.md,
    fontFamily: fonts.medium,
    color: colors.coolTonedgrey,
  },
});