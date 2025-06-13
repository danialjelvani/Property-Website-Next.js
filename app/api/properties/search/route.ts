import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "6", 10);

    const skip = (page - 1) * pageSize;

    const locationPattern = location ? new RegExp(location, "i") : null; // i for case-insensitive

    const query: any = {};

    if (locationPattern) {
      query.$or = [
        { name: locationPattern },
        { description: locationPattern },
        { "location.state": locationPattern },
        { "location.city": locationPattern },
        { "location.street": locationPattern },
        { "location.zipcode": locationPattern },
      ];
    }

    if (propertyType && propertyType !== "All") {
      const propertyTypePattern = new RegExp(propertyType, "i"); // i for case-insensitive
      query.type = propertyTypePattern;
    }

    const [properties, total] = await Promise.all([
      Property.find(query).skip(skip).limit(pageSize),
      Property.countDocuments(query),
    ]);

    return new Response(JSON.stringify({ properties, total }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Database Error", { status: 500 });
  }
};
