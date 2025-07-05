import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { IPropertyData } from "@/app/api/properties/route";

// Get /api/properties/{id}
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  const { id } = await params;
  try {
    await connectDB();
    const property = await Property.findById(id);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response("Database Error", { status: 500 });
  }
}

// delete /api/properties/{id}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    const { id } = await params;
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is not provided", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();
    const property = await Property.findById(id);

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    if (userId !== property.owner.toString()) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response("property deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Database Error", { status: 500 });
  }
}

// Put /api/properties/{id}
export const PUT = async (
  request: Request,
  { params }: { params: Promise<any> }
) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId)
      return new Response("Unauthorized", { status: 401 });
    const { userId } = sessionUser;

    const { id } = await params;

    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response("Property not found", { status: 404 });
    }

    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const requestType = request.headers.get("X-Request-Type");

    switch (requestType) {
      case "formdata":
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

        const updatedProperty = await Property.findByIdAndUpdate(
          id,
          propertyData
        );

        return NextResponse.json(updatedProperty, { status: 200 });
      case "imagesformdata":
        const imagesFormData = await request.formData();
        const images = imagesFormData.getAll("images");
        await Property.findByIdAndUpdate(id, { images: images });
        return NextResponse.json({ message: "Images updated successfully" });

      default:
        return NextResponse.json(
          { error: "Invalid content type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error updating property:", error);
    return new Response("Failed to update property", { status: 500 });
  }
};
