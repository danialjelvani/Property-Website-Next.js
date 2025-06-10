import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location!, "i"); // i for case-insensitive

    const query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.state": locationPattern },
        { "location.city": locationPattern },
        { "location.street": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    } as any;

    if (propertyType && propertyType !== "All") {
      const propertyTypePattern = new RegExp(propertyType!, "i"); // i for case-insensitive
      query.type = propertyTypePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Database Error", { status: 500 });
  }
};
