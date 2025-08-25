import { StyleSheet } from "react-native";
import { colors } from "../themes/colors";

export const globalStyles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rootContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.coolTonedgrey,
  
  },
});