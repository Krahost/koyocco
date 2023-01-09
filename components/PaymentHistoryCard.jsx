import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { COLORS } from "../variables/color";
import { useStateValue } from "../StateProvider";
import { getPrice } from "../helper/helper";
import { __ } from "../language/stringPicker";
import moment from "moment";

const PaymentHistoryCard = ({ item, onCardPress }) => {
  const [{ appSettings, config, rtl_support, ios }] = useStateValue();
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
  const getStatusColor = () => {
    if (item.status === "Refunded") {
      return COLORS.text_gray;
    } else if (["Cancelled", "Failed"].includes(item.status)) {
      return COLORS.paymentStatus.cancelled.text;
    } else if (item.status === "Completed") {
      return COLORS.paymentStatus.success.text;
    } else if (["Pending", "On hold"].includes(item.status)) {
      return COLORS.paymentStatus.pending.text;
    } else if (["Created", "Processing"].includes(item.status)) {
      return COLORS.dodgerblue;
    } else {
      return COLORS.text_dark;
    }
  };
  const getStatusBgColor = () => {
    if (item.status === "Refunded") {
      return COLORS.bg_dark;
    } else if (["Cancelled", "Failed"].includes(item.status)) {
      return COLORS.paymentStatus.cancelled.bg;
    } else if (item.status === "Completed") {
      return COLORS.paymentStatus.success.bg;
    } else if (["Pending", "On hold"].includes(item.status)) {
      return COLORS.paymentStatus.pending.bg;
    } else if (["Created", "Processing"].includes(item.status)) {
      return COLORS.bg_dark;
    } else {
      return COLORS.bg_dark;
    }
  };
  return (
    <TouchableWithoutFeedback onPress={onCardPress}>
      <View style={styles.container}>
        <View style={[styles.contentWrap, rtlView]}>
          <View style={styles.cardLeftWrap}>
            <View style={styles.methodWrap}>
              <Text style={[styles.method, rtlTextA]}>
                {__("paymentsScreenTexts.paymentMethodPrefix", appSettings.lng)}{" "}
                {item.method}
                {/* <Text style={{ fontStyle: "italic" }}>{item.method}</Text> */}
              </Text>
            </View>
            <View style={styles.dateWrap}>
              <Text style={[styles.date, rtlTextA]}>
                {moment(
                  item?.paid_date || item?.created_date,
                  "YYYY-MM-DD H-mm-ss"
                ).format("Do MMM YYYY | h:mm a")}
              </Text>
            </View>
          </View>
          <View style={styles.cardRightWrap}>
            <View
              style={[
                styles.priceWrap,
                { alignItems: rtl_support ? "flex-start" : "flex-end" },
              ]}
            >
              <Text
                style={[
                  styles.price,
                  {
                    textDecorationLine:
                      config?.coupon && item?.coupon?.discount
                        ? "line-through"
                        : "none",
                    color:
                      config?.coupon && item?.coupon?.discount
                        ? COLORS.red
                        : COLORS.text_dark,
                  },
                  rtlText,
                ]}
              >
                {getPrice(config.payment_currency, {
                  pricing_type: "price",
                  price_type: "fixed",
                  price: item.price,
                  max_price: 0,
                })}
              </Text>
            </View>
            {config?.coupon && item?.coupon?.discount && (
              <View
                style={[
                  styles.priceWrap,
                  { alignItems: rtl_support ? "flex-start" : "flex-end" },
                ]}
              >
                <Text style={[styles.price, rtlText]}>
                  {getPrice(config.payment_currency, {
                    pricing_type: "price",
                    price_type: "fixed",
                    price: item?.coupon?.subtotal,
                    max_price: 0,
                  })}
                </Text>
              </View>
            )}
            <View
              style={[
                styles.statusWrap,
                {
                  alignItems: rtl_support ? "flex-start" : "flex-end",
                  backgroundColor: getStatusBgColor(),
                  paddingVertical: ios ? 6 : 4,
                  paddingHorizontal: 12,
                  borderRadius: 30,
                  marginTop: 5,
                },
              ]}
            >
              <Text
                style={[
                  styles.status,
                  {
                    color: getStatusColor(),
                  },
                  rtlText,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardLeftWrap: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardRightWrap: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: COLORS.white,
    marginHorizontal: "3%",
    marginVertical: "2%",
    padding: 15,
    borderRadius: 5,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 2,
  },
  contentWrap: {
    flexDirection: "row",
  },
  date: {
    fontSize: 13.5,
    fontWeight: "bold",
    color: COLORS.text_gray,
  },
  method: {
    fontWeight: "bold",
    color: COLORS.text_dark,
    fontSize: 16,
  },
  methodWrap: {
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text_dark,
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.text_dark,
  },
});

export default PaymentHistoryCard;
