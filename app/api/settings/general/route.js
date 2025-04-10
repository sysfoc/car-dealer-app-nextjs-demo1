import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import GeneralSettings from "@/app/models/settings/General.js";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    

    const { 
      logo = "", 
      favicon = "",
      top = {
        hideDarkMode: false,
        hideFavourite: false,
        hideLogo: false
      },
      footer = {
        col1Heading: "",
        col2Heading: "",
        col3Heading: ""
      },
      recaptcha = {
        siteKey: "",
        status: "inactive"
      },
      analytics = {
        trackingId: "",
        status: "inactive"
      },
      cookieConsent = {
        message: "",
        buttonText: "ACCEPT",
        textColor: "#000000",
        bgColor: "#ffffff",
        buttonTextColor: "#ffffff",
        buttonBgColor: "#000000",
        status: "inactive"
      },
      themeColor = {
        darkModeBg: "#000000",
        darkModeText: "#ffffff"
      }
    } = body;

    if (!logo || !favicon) {
      return NextResponse.json(
        { error: "Logo and Favicon are required" },
        { status: 400 }
      );
    }

    const existingSettings = await GeneralSettings.findOne();
    let updatedSettings;

    if (existingSettings) {
      
      existingSettings.logo = logo;
      existingSettings.favicon = favicon;
      existingSettings.top = { ...existingSettings.top, ...top };
      existingSettings.footer = { ...existingSettings.footer, ...footer };
      existingSettings.recaptcha = { ...existingSettings.recaptcha, ...recaptcha };
      existingSettings.analytics = { ...existingSettings.analytics, ...analytics };
      existingSettings.cookieConsent = { ...existingSettings.cookieConsent, ...cookieConsent };
      existingSettings.themeColor = { ...existingSettings.themeColor, ...themeColor };
      
      updatedSettings = await existingSettings.save();
    } else {
      updatedSettings = await GeneralSettings.create({
        logo,
        favicon,
        top,
        footer,
        recaptcha,
        analytics,
        cookieConsent,
        themeColor
      });
    }

    return NextResponse.json({
      message: "Settings saved successfully",
      settings: updatedSettings
    });

  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const settings = await GeneralSettings.findOne();


    return NextResponse.json({
      settings: settings || {
        logo: "",
        favicon: "",
        top: {
          hideDarkMode: false,
          hideFavourite: false,
          hideLogo: false
        },
        footer: {
          col1Heading: "",
          col2Heading: "",
          col3Heading: ""
        },
        recaptcha: {
          siteKey: "",
          status: "inactive"
        },
        analytics: {
          trackingId: "",
          status: "inactive"
        },
        cookieConsent: {
          message: "",
          buttonText: "ACCEPT",
          textColor: "#000000",
          bgColor: "#ffffff",
          buttonTextColor: "#ffffff",
          buttonBgColor: "#000000",
          status: "inactive"
        },
        themeColor: {
          darkModeBg: "#000000",
          darkModeText: "#ffffff"
        }
      }
    });

  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}