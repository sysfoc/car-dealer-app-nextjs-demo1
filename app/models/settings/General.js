import mongoose from "mongoose";

const generalSettingsSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      required: true,
    },
    favicon: {
      type: String,
      required: true,
    },
    top: {
      hideDarkMode: Boolean,
      hideFavourite: Boolean,
      hideLogo: Boolean,
    },
    footer: {
      col1Heading: String,
      col2Heading: String,
      col3Heading: String,
    },
    recaptcha: {
      siteKey: String,
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
      },
    },
    analytics: {
      trackingId: String,
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
      },
    },
    cookieConsent: {
      message: String,
      buttonText: String,
      textColor: String,
      bgColor: String,
      buttonTextColor: String,
      buttonBgColor: String,
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
      },
    },
    themeColor: {
      darkModeBg: String,
      darkModeText: String,
    },
  },
  {
    timestamps: true,
  }
);

const GeneralSettings = mongoose.models.GeneralSettings || 
  mongoose.model("GeneralSettings", generalSettingsSchema);

export default GeneralSettings;