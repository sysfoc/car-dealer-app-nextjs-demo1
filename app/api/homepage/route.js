import connectToMongoDB from "../../lib/mongodb";
import { NextResponse } from "next/server";
// import path from "path";
// import fs from "fs/promises";
import Homepage from "../../models/Homepage.js";

connectToMongoDB();

export async function POST(request) {
  try {
    const formData = await request.formData();

    const seoTitle = formData.get("seoTitle");
    const seoDescription = formData.get("seoDescription");

    const searchHeading = formData.get("searchHeading");
    const searchText = formData.get("searchText");

    const brandHeading = formData.get("brandHeading");
    const brandSubheading = formData.get("brandSubheading");
    const brandItems = formData.get("brandItems");
    const brandStatus = formData.get("brandStatus");

    const listingHeading = formData.get("listingHeading");
    const listingSubheading = formData.get("listingSubheading");
    const listingItems = formData.get("listingItems");
    const listingStatus = formData.get("listingStatus");

    const chooseUsData = {
      heading: formData.get("chooseusHeading"),
      first: {
        heading: formData.get("chooseusFirstHeading"),
        description: formData.get("chooseusFirstDescription"),
      },
      second: {
        heading: formData.get("chooseusSecondHeading"),
        description: formData.get("chooseusSecondDescription"),
      },
      third: {
        heading: formData.get("chooseusThirdHeading"),
        description: formData.get("chooseusThirdDescription"),
      },
      fourth: {
        heading: formData.get("chooseusFourthHeading"),
        description: formData.get("chooseusFourthDescription"),
      },
    };

    const footer = {
      monday: formData.get("mondayHr"),
      tuesday: formData.get("tuesdayHr"),
      wednesday: formData.get("wednesdayHr"),
      thursday: formData.get("thursdayHr"),
      friday: formData.get("fridayHr"),
      saturday: formData.get("saturdayHr"),
    };

    const homepageData = new Homepage({
      seoTitle,
      seoDescription,

      searchSection: {
        heading: searchHeading,
        text: searchText,
      },
      brandSection: {
        heading: brandHeading,
        subheading: brandSubheading,
        items: brandItems,
        status: brandStatus,
      },
      listingSection: {
        heading: listingHeading,
        subheading: listingSubheading,
        items: listingItems,
        status: listingStatus,
      },
      chooseUs: chooseUsData,
      footer,
    });

    await homepageData.save();

    return NextResponse.json(
      { message: "Homepage content saved successfully!", data: homepageData },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error saving homepage content:", error);
    return NextResponse.json(
      { error: "Failed to save homepage data." },
      { status: 500 },
    );
  }
}
