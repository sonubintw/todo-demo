import { StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
import { fonts } from "../../themes/fonts";
import { fontSizes } from "../../global/fontSize";

export const dashboardStyles = StyleSheet.create({
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlsContainer: {
    padding: 10,
    elevation: 4,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: colors.accent,
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipLabel: {
    width: 50,
    fontSize: fontSizes.md,
    marginRight: 10,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  chips: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  chip: {
    marginRight: 10,
    marginBottom: 8,
    backgroundColor: colors.lightGrey,
  },
  selectedChip: {
    backgroundColor: colors.cardBlack,
  },
  chipText: {
    color: colors.black,
    fontFamily: fonts.regular,
  },
  selectedChipText: {
    color: colors.accent,
    fontFamily: fonts.medium,
  },
  divider: {
    marginVertical: 10,
  },
});