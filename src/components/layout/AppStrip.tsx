// Reads the app download links and hands them to the strip.
//
// Split in two because the strip has to know which page it is on to choose an
// app, and that is a client-side question, while the links live in the database.

import { getSettings } from "@/lib/db";
import AppStripView from "./AppStripView";

export default async function AppStrip() {
  const settings = await getSettings();

  return (
    <AppStripView
      dahabPlus={{
        site: settings.dahabPlusSite ?? "",
        android: settings.dahabPlusAndroid ?? "",
        ios: settings.dahabPlusIos ?? "",
      }}
      superApp={{
        site: settings.superAppSite ?? "",
        android: settings.superAppAndroid ?? "",
        ios: settings.superAppIos ?? "",
      }}
    />
  );
}
