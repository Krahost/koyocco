import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

// Vector Icons
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

// Custom Components & Constants
import { COLORS } from "../variables/color";
import { useStateValue } from "../StateProvider";

const ListingHeader = ({
  onBack,
  onFavorite,
  title,
  style,
  author,
  is_favourite,
  favoriteDisabled,
  favLoading,
  sharable,
  onShare,
}) => {
  const [{ user, rtl_support }] = useStateValue();
  const rtlText = rtl_support && {
    writingDirection: "rtl",
  };
  const rtlTextA = rtl_support && {
    writingDirection: "rtl",
    textAlign: "right",
  };
  const rtlView = rtl_support && {
    flexDirection: "row-reverse",
  };

  return (
    <View style={[styles.container, styles.flexRow, style]}>
      <TouchableOpacity
        onPress={onBack}
        style={{
          backgroundColor: COLORS.white,
          height: 35,
          width: 35,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 35 / 2,
        }}
      >
        <Feather name="arrow-left" size={24} color={COLORS.gray} />
      </TouchableOpacity>

      <View style={styles.flexRow}>
        {sharable && (
          <TouchableOpacity
            onPress={onShare}
            disabled={favoriteDisabled}
            style={{
              marginRight:
                user !== null && user.id !== author && !!author ? 15 : 0,
              backgroundColor: COLORS.white,
              height: 35,
              width: 35,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 35 / 2,
            }}
          >
            <Fontisto name="share" size={16} color={COLORS.gray} />
          </TouchableOpacity>
        )}
        {user !== null && user.id !== author && !!author && (
          <View>
            <TouchableOpacity
              onPress={onFavorite}
              disabled={favoriteDisabled}
              style={{
                backgroundColor: COLORS.white,
                height: 35,
                width: 35,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 35 / 2,
              }}
            >
              {favLoading ? (
                <View
                  style={{
                    width: 35,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size="small" color={COLORS.gray} />
                </View>
              ) : (
                <FontAwesome
                  name={is_favourite ? "heart" : "heart-o"}
                  size={20}
                  color={COLORS.gray}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    width: "100%",
    // position: "absolute",
    // top: 0,
    // left: 0,
    // zIndex: 1,
    height: 50,
    // backgroundColor: COLORS.primary,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  shareButton: {
    width: 30,
  },
});

export default ListingHeader;
