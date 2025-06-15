const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

interface IFetchProperties {
  showFeatured?: boolean;
}

// Fetch all properties
export async function fetchProperties({
  showFeatured = false,
}: IFetchProperties = {}) {
  try {
    // handle the case where the domain is not set
    if (!apiDomain) {
      throw new Error("API domain is not set");
      return [];
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// fetch property by id
export async function fetchPropertyById(id: any) {
  try {
    // handle the case where the domain is not set
    if (!apiDomain) {
      throw new Error("API domain is not set");
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
