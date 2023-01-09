import React from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Vector Fonts
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

// Custom Components & Constants
import { decodeString, getPrice } from "../helper/helper";
import { COLORS } from "../variables/color";
import { useStateValue } from "../StateProvider";
import Badge from "./Badge";
import { __ } from "../language/stringPicker";
import ListAdComponent from "./ListAdComponent";
import { admobConfig } from "../app/services/adMobConfig";
import CategoryIcon from "./CategoryIcon";

const { width: screenWidth } = Dimensions.get("screen");

const listingCardFallbackImageUrl = require("../assets/100x100.png");

const ListingCard = ({ onPress, item }) => {
  const [{ config, ios, appSettings, rtl_support }] = useStateValue();

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
  const getCategory = (items) => {
    if (!items?.length) return false;
    return decodeString(items[items.length - 1].name);
  };
  const getLocation = (items) => {
    if (!items?.length) return false;
    // return decodeString(items[items.length - 1].name);
    return decodeString(items.map((_loc) => _loc.name).join(", "));
  };

  const getPriceUnit = () => {
    if (item?.price_unit && item?.price_units?.length) {
      const tempUnit = item.price_units.filter(
        (_pu) => _pu.id === item?.price_unit
      )[0];
      // return decodeString(tempUnit.short + tempUnit.name);
      return decodeString("/" + tempUnit.id);
    } else {
      if (item?.price_unit) return decodeString("/" + item.price_unit);
    }
  };

  return item.listAd && admobConfig?.admobEnabled ? (
    <ListAdComponent dummy={item.dummy} />
  ) : (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            styles.itemWrap,
            {
              // backgroundColor: getBackgroundColor()
              //   ? getBackgroundColor()
              //   : COLORS.white,
              backgroundColor: COLORS.white,
              flex: 1,
            },
          ]}
        >
          {item?.badges?.includes("is-bump-up") && (
            <View style={styles.badgeSection}>
              <Badge badgeName="is-bump-up" type="card" />
            </View>
          )}
          {item?.badges?.includes("is-sold") && (
            <View
              style={[
                styles.soldOutBadge,
                {
                  top: "6%",
                  // left: ios ? "54%" : "56%",
                  right: "-18%",
                  width: "70%",
                },
              ]}
            >
              <Text style={styles.soldOutBadgeMessage}>
                {__("listingCardTexts.soldOutBadgeMessage", appSettings.lng)}
              </Text>
            </View>
          )}
          {item?.badges?.includes("is-bump-up") && (
            <View style={styles.bumpUpBadge}></View>
          )}

          <View style={styles.itemImageWrap}>
            <LinearGradient
              // Background Linear Gradient
              colors={["transparent", "#000000"]}
              style={{
                zIndex: 1,
                height: "35%",
                width: "100%",
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
            />
            <Image
              style={styles.itemImage}
              source={
                item?.images?.length
                  ? {
                      uri: item.images[0].sizes.thumbnail.src,
                    }
                  : listingCardFallbackImageUrl
              }
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: screenWidth * 0.38,
              paddingHorizontal: 15,
            }}
          >
            <Text style={[styles.itemPrice, rtlText]} numberOfLines={1}>
              {getPrice(
                config.currency,
                {
                  pricing_type: item.pricing_type,
                  price_type: item.price_type,
                  price: item.price,
                  max_price: item.max_price,
                },
                appSettings.lng
              )}
              {getPriceUnit()}
            </Text>
          </View>
          <View
            style={[
              styles.itemDetailWrap,
              { alignItems: rtl_support ? "flex-end" : "flex-start" },
            ]}
          >
            <View
              style={{
                paddingHorizontal: 15,
                alignItems: rtl_support ? "flex-end" : "flex-start",
              }}
            >
              <View
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  backgroundColor: COLORS.bg_primary,
                  marginBottom: 5,
                  justifyContent: "center",
                  alignItems: rtl_support ? "flex-end" : "flex-start",
                }}
              >
                <Text
                  style={[
                    styles.itemCategory,
                    { paddingBottom: ios ? 3 : 1 },
                    rtlText,
                  ]}
                  numberOfLines={1}
                >
                  {getCategory(item.categories)}
                </Text>
              </View>
              <Text
                style={[
                  styles.itemTitle,
                  { paddingBottom: ios ? 3 : 1 },
                  rtlTextA,
                ]}
                numberOfLines={2}
              >
                {decodeString(item.title)}
              </Text>
              {(!!item?.contact?.locations?.length ||
                !!item?.contact?.geo_address) && (
                <>
                  {config.location_type === "local" ? (
                    <>
                      {!!item?.contact?.locations?.length && (
                        <View
                          style={[
                            styles.itemLocationWrap,
                            { paddingBottom: ios ? 5 : 3 },
                            rtlView,
                          ]}
                        >
                          <FontAwesome5
                            name="map-marker-alt"
                            size={10}
                            color={COLORS.text_gray}
                          />
                          <Text style={[styles.itemLocation, rtlTextA]}>
                            {getLocation(item.contact.locations)}
                          </Text>
                        </View>
                      )}
                    </>
                  ) : (
                    <>
                      {!!item?.contact?.geo_address && (
                        <View
                          style={[
                            styles.itemLocationWrap,
                            { paddingBottom: ios ? 5 : 3 },
                            rtlView,
                          ]}
                        >
                          <FontAwesome5
                            name="map-marker-alt"
                            size={10}
                            color={COLORS.text_gray}
                          />
                          <Text
                            style={[styles.itemLocation, rtlTextA]}
                            numberOfLines={1}
                          >
                            {decodeString(item.contact.geo_address)}
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                </>
              )}
            </View>
            <View
              style={{
                borderTopWidth: 1,
                width: "100%",
                borderColor: COLORS.border_light,
                paddingHorizontal: 15,
                paddingTop: 5,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 3,
              }}
            >
              {item?.custom_fields?.length > 3 ? (
                <>
                  {item.custom_fields.slice(0, 3).map((_cf, index) => (
                    <View
                      key={`${index}`}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        maxWidth: "50%",
                      }}
                    >
                      <View>
                        <CategoryIcon
                          iconName={
                            _cf.icon.trim().includes("flaticon-")
                              ? _cf.icon.trim().slice(9)
                              : _cf.icon
                          }
                          iconSize={12}
                          iconColor={COLORS.primary}
                        />
                      </View>
                      <View style={{ paddingHorizontal: 5 }}>
                        <Text
                          style={{ fontSize: 13, color: COLORS.text_gray }}
                          numberOfLines={1}
                        >
                          {_cf?.value || ""}
                        </Text>
                      </View>
                    </View>
                  ))}
                </>
              ) : (
                <>
                  {item.custom_fields.map((_cf, index) => (
                    <View
                      key={`${index}`}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        maxWidth: "50%",
                      }}
                    >
                      <View>
                        <CategoryIcon
                          iconName={
                            _cf.icon.trim().includes("flaticon-")
                              ? _cf.icon.trim().slice(9)
                              : _cf.icon
                          }
                          iconSize={12}
                          iconColor={COLORS.primary}
                        />
                      </View>
                      <View style={{ paddingHorizontal: 5 }}>
                        <Text
                          style={{ fontSize: 13, color: COLORS.text_gray }}
                          numberOfLines={1}
                        >
                          {_cf?.value || ""}
                        </Text>
                      </View>
                    </View>
                  ))}
                </>
              )}
              {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <FontAwesome name="bed" size={12} color={COLORS.primary} />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={{ fontSize: 13, color: COLORS.text_gray }}>
                    3
                  </Text>
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  badgeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    margin: 2,
  },
  badgeStyle: {
    padding: 3,
    elevation: 5,
  },
  badgeTextStyle: {
    color: COLORS.white,
    fontSize: 12,
  },
  bumpUpBadge: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.badges["is-bump-up"],
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  container: {},
  listingTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "3%",

    marginVertical: 10,
  },
  itemCategory: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  itemDetailWrap: {
    // paddingHorizontal: 15,
    paddingVertical: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: COLORS.border_light,
  },
  itemImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  itemImageWrap: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
    height: screenWidth * 0.455,
  },
  itemLocation: {
    color: COLORS.text_gray,
    fontSize: 12,
    paddingHorizontal: 5,
  },
  itemLocationWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
  },
  itemPrice: {
    color: COLORS.white,
    fontSize: 14.5,
    fontWeight: "bold",
  },
  itemTitle: {
    fontSize: 13.5,
    fontWeight: "bold",
    color: COLORS.text_dark,
  },
  itemWrap: {
    marginHorizontal: screenWidth * 0.015,
    overflow: "hidden",
    borderRadius: 3,
    marginBottom: screenWidth * 0.03,
    width: screenWidth * 0.455,
    // elevation: 4,
  },
  soldOutBadge: {
    position: "absolute",
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
    transform: [{ rotate: "45deg" }],

    flex: 1,
    elevation: 7,
    zIndex: 20,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  soldOutBadgeMessage: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default ListingCard;
