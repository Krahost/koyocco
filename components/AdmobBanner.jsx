// import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";

import React, { useEffect } from "react";
import { admobConfig } from "../app/services/adMobConfig";
import { useStateValue } from "../StateProvider";

const AdmobBanner = ({ onError }) => {
  const [{ ios }] = useStateValue();

  useEffect(() => {
    if (admobConfig?.admobEnabled) {
      configureAdmobTestDeviceID();
    }
  }, []);

  const configureAdmobTestDeviceID = async () => {
    await setTestDeviceIDAsync("EMULATOR");
  };
  return (
    <AdMobBanner
      bannerSize={admobConfig.listAdType}
      adUnitID={
        ios ? admobConfig.admobBannerId.iOS : admobConfig.admobBannerId.android
      }
      onDidFailToReceiveAdWithError={(error) => onError(error)}
    />
  );
};

export default AdmobBanner;
