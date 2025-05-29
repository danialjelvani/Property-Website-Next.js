"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";

type PropertyFieldsType = {
  type: string;
  name: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: string;
  baths: string;
  square_feet: string;
  amenities: AmenityType[];
  rates: {
    nightly: string;
    weekly: string;
    monthly: string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: File[];
};

type AmenityType =
  | "Wifi"
  | "Full kitchen"
  | "Washer & Dryer"
  | "Free Parking"
  | "Swimming Pool"
  | "Hot Tub"
  | "24/7 Security"
  | "Wheelchair Accessible"
  | "Elevator Access"
  | "Dishwasher"
  | "Gym/Fitness Center"
  | "Air Conditioning"
  | "Balcony/Patio"
  | "Smart TV"
  | "Coffee Maker";

const propertyAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState<PropertyFieldsType>({
    type: "Apartment",
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    beds: "",
    baths: "",
    square_feet: "",
    amenities: [],
    rates: {
      nightly: "",
      weekly: "",
      monthly: "",
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
    images: [],
  });

  // Function to handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFields((prevFields: any) => ({
        ...prevFields,
        [parent]: {
          ...prevFields[parent],
          [child]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  // Function to handle amenities changes
  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setFields((prevFields: any) => ({
        ...prevFields,
        amenities: [...prevFields.amenities, value],
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        amenities: prevFields.amenities.filter((amenity) => amenity !== value),
      }));
    }
  };

  // Function to handle image changes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: any = Array.from(e.target.files);
      const updatedImages = [...fields.images];

      // Prevent adding more than 4 image files
      if (files.length + fields.images.length > 4) {
        alert("You can only upload up to 4 files.");
        e.target.value = "";
        return;
      }

      // Prevent adding duplicate image files
      for (const file of files) {
        if (updatedImages.some((image) => image.name === file.name)) {
          alert("You cannot upload duplicate files.");
          e.target.value = "";
          return;
        }
      }

      // Prevent adding files that exceed 5MB
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be less than 5MB.");
          e.target.value = "";
          return;
        }
      }

      // Prevent adding files with invalid file types
      for (const file of files) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
          alert("Invalid file type. Please upload a JPEG, JPG, or PNG file.");
          e.target.value = "";
          return;
        }
      }

      for (const file of files) {
        updatedImages.push(file);
      }

      setFields((prevFields: any) => ({
        ...prevFields,
        images: updatedImages,
      }));
    }
  };

  // Function to handle image deletion
  const handleDeleteImage = (indexToDelete: number) => {
    setFields((prevFields: any) => ({
      ...prevFields,
      images: prevFields.images.filter(
        (_: any, index: number) => index !== indexToDelete
      ),
    }));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fields.images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();

    // Add images
    fields.images.forEach((file) => {
      formData.append("images", file);
    });

    // Add other form fields
    const form = e.currentTarget;
    const formElements = new FormData(form); // grabs other fields (title, description, etc.)

    for (const [key, value] of formElements.entries()) {
      if (key !== "images") {
        formData.append(key, value);
      }
    }

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("Upload failed: " + errorText);
        return;
      }

      alert("Form submitted successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong!");
    }
  };

  useEffect(() => setMounted(true), []);

  return (
    mounted && (
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-bold font-Title2 mb-6">
          Add Property
        </h2>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Property Type
          </label>
          <select
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3"
            required
            onChange={handleChange}
            value={fields.type}
          >
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="CabinOrCottage">Cabin or Cottage</option>
            <option value="Room">Room</option>
            <option value="Studio">Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Listing Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="eg. Beautiful Apartment In Miami"
            required
            onChange={handleChange}
            value={fields.name}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows={4}
            placeholder="Add an optional description of your property"
            onChange={handleChange}
            value={fields.description}
          ></textarea>
        </div>

        <div className="mb-4 bg-amber-600 p-4 rounded-lg">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            type="text"
            id="street"
            name="location.street"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Street"
            onChange={handleChange}
            value={fields.location.street}
          />
          <input
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="City"
            required
            onChange={handleChange}
            value={fields.location.city}
          />
          <input
            type="text"
            id="state"
            name="location.state"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="State"
            required
            onChange={handleChange}
            value={fields.location.state}
          />
          <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Zipcode"
            onChange={handleChange}
            value={fields.location.zipcode}
          />
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="beds"
              className="block text-gray-700 font-bold mb-2"
            >
              Beds
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              className="border rounded w-full py-2 px-3"
              required
              onChange={handleChange}
              value={fields.beds}
            />
          </div>
          <div className="w-full sm:w-1/3 px-2">
            <label
              htmlFor="baths"
              className="block text-gray-700 font-bold mb-2"
            >
              Baths
            </label>
            <input
              type="number"
              id="baths"
              name="baths"
              className="border rounded w-full py-2 px-3"
              required
              onChange={handleChange}
              value={fields.baths}
            />
          </div>
          <div className="w-full sm:w-1/3 pl-2">
            <label
              htmlFor="square_feet"
              className="block text-gray-700 font-bold mb-2"
            >
              Square Feet
            </label>
            <input
              type="number"
              id="square_feet"
              name="square_feet"
              className="border rounded w-full py-2 px-3"
              required
              onChange={handleChange}
              value={fields.square_feet}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 accent-black">
            <div>
              <input
                type="checkbox"
                id="amenity_wifi"
                name="amenities"
                value="Wifi"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Wifi")}
              />
              <label htmlFor="amenity_wifi">Wifi</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_kitchen"
                name="amenities"
                value="Full kitchen"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Full kitchen")}
              />
              <label htmlFor="amenity_kitchen">Full kitchen</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_washer_dryer"
                name="amenities"
                value="Washer & Dryer"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Washer & Dryer")}
              />
              <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_free_parking"
                name="amenities"
                value="Free Parking"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Free Parking")}
              />
              <label htmlFor="amenity_free_parking">Free Parking</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_pool"
                name="amenities"
                value="Swimming Pool"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Swimming Pool")}
              />
              <label htmlFor="amenity_pool">Swimming Pool</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_hot_tub"
                name="amenities"
                value="Hot Tub"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Hot Tub")}
              />
              <label htmlFor="amenity_hot_tub">Hot Tub</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="amenity_gym_fitness_center"
                name="amenities"
                value="Gym/Fitness Center"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Gym/Fitness Center")}
              />
              <label htmlFor="amenity_gym_fitness_center">
                Gym/Fitness Center
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_wheelchair_accessible"
                name="amenities"
                value="Wheelchair Accessible"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Wheelchair Accessible")}
              />
              <label htmlFor="amenity_wheelchair_accessible">
                Wheelchair Accessible
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_elevator_access"
                name="amenities"
                value="Elevator Access"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Elevator Access")}
              />
              <label htmlFor="amenity_elevator_access">Elevator Access</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_24_7_security"
                name="amenities"
                value="24/7 Security"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("24/7 Security")}
              />
              <label htmlFor="amenity_24_7_security">24/7 Security</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_dishwasher"
                name="amenities"
                value="Dishwasher"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Dishwasher")}
              />
              <label htmlFor="amenity_dishwasher">Dishwasher</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="amenity_air_conditioning"
                name="amenities"
                value="Air Conditioning"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Air Conditioning")}
              />
              <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_balcony_patio"
                name="amenities"
                value="Balcony/Patio"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Balcony/Patio")}
              />
              <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_smart_tv"
                name="amenities"
                value="Smart TV"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Smart TV")}
              />
              <label htmlFor="amenity_smart_tv">Smart TV</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_coffee_maker"
                name="amenities"
                value="Coffee Maker"
                className="mr-2"
                onChange={handleAmenitiesChange}
                checked={fields.amenities.includes("Coffee Maker")}
              />
              <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-amber-600 p-4 rounded-lg">
          <label className="block text-gray-700 font-bold mb-2">
            Rates (Leave blank if not applicable)
          </label>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <label htmlFor="nightly_rate" className="mr-2">
                Nightly
              </label>
              <input
                type="number"
                id="nightly_rate"
                name="rates.nightly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.nightly}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="weekly_rate" className="mr-2">
                Weekly
              </label>
              <input
                type="number"
                id="weekly_rate"
                name="rates.weekly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.weekly}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="monthly_rate" className="mr-2">
                Monthly
              </label>
              <input
                type="number"
                id="monthly_rate"
                name="rates.monthly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.monthly}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="seller_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Name
          </label>
          <input
            type="text"
            id="seller_name"
            name="seller_info.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Name"
            value={fields.seller_info.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_email"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Email
          </label>
          <input
            type="email"
            id="seller_email"
            name="seller_info.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Email address"
            required
            value={fields.seller_info.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_phone"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Phone
          </label>
          <input
            type="tel"
            id="seller_phone"
            name="seller_info.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Phone"
            value={fields.seller_info.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-gray-700 font-bold mb-2"
          >
            Images (Select up to 4 images)
          </label>
          <div
            onClick={handleClick}
            className="border rounded w-full py-2 px-3 cursor-pointer"
          >
            <span className="opacity-65">Click to add images ...</span>
            <p className="opacity-50 text-center text-sm">
              {" "}
              You have selected {fields.images.length} image(s)
            </p>
            <input
              type="file"
              id="images"
              name="images"
              className="hidden"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          {fields.images.length > 0 && (
            <ol className="m-2 text-gray-600 list-decimal space-y-2">
              {fields.images.map((file, index) => (
                <li key={index}>
                  {file.name}{" "}
                  <button
                    type="button"
                    className="cursor-pointer rounded-md ml-1 p-1 text-red-800 ring-1 hover:ring-2 active:ring-2"
                    onClick={() => handleDeleteImage(index)}
                  >
                    ❌ Delete
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
        <div>
          <button
            className="linkbuttondark text-white cursor-pointer font-bold py-2 px-4 rounded-full w-full"
            type="submit"
          >
            Add Property
          </button>
        </div>
      </form>
    )
  );
};

export default propertyAddForm;
