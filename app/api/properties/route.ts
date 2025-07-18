import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export interface IPropertyData {
  type: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  location: {
    street: FormDataEntryValue | null;
    city: FormDataEntryValue | null;
    state: FormDataEntryValue | null;
    zipcode: FormDataEntryValue | null;
  };
  beds: FormDataEntryValue | null;
  baths: FormDataEntryValue | null;
  square_feet: FormDataEntryValue | null;
  amenities: FormDataEntryValue[] | null;
  rates: {
    nightly: FormDataEntryValue | null;
    weekly: FormDataEntryValue | null;
    monthly: FormDataEntryValue | null;
  };
  seller_info: {
    name: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    phone: FormDataEntryValue | null;
  };
  owner: string;
  images: FormDataEntryValue[];
  lat: FormDataEntryValue | null;
  lng: FormDataEntryValue | null;
}

// Get /api/properties
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 6;

    const skip = (Number(page) - 1) * Number(pageSize);

    const properties = await Property.find({})
      .skip(skip)
      .limit(Number(pageSize));

    const total = await Property.countDocuments();

    const result = {
      properties,
      total,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Database Error", { status: 500 });
  }
};

// Post /api/properties
export const POST = async (request: Request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId)
      return new Response("Unauthorized", { status: 401 });
    const { userId } = sessionUser;

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    const imageUrls = formData.getAll("images");

    const propertyData: IPropertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities: amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
      images: imageUrls,
      lat: formData.get("lat"),
      lng: formData.get("lng"),
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();
    return NextResponse.json({ _id: newProperty._id }, { status: 201 });
  } catch {
    return new Response("Failed to add property", { status: 500 });
  }
};
