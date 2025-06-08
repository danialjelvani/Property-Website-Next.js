"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { toast, Slide } from "react-toastify";
import dynamic from "next/dynamic";
import Typewriter from "./typewriter";
import { fetchPropertyById } from "@/utils/requests";

const LocationPicker = dynamic(() => import("@/components/locationPicker"), {
  ssr: false, // Disable server-side rendering to fix window is not defined error
});

const MapViewer = dynamic(() => import("@/components/mapViewer"), {
  ssr: false, // Disable server-side rendering to fix window is not defined error
});

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
  images: {
    name?: string;
    url: string;
    public_id: string;
    blurDataURL?: string;
  }[];
  lat: string;
  lng: string;
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

const PropertyEditForm = () => {
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const [retryKey, setRetryKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [mapEdit, setMapEdit] = useState(false);

  const [fields, setFields] = useState<PropertyFieldsType>({
    type: "",
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
    lat: "",
    lng: "",
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

  // function to handle geo change
  useEffect(() => {
    if (location) {
      setFields((prevFields) => ({
        ...prevFields,
        lat: location.lat.toString(),
        lng: location.lng.toString(),
      }));
    }
  }, [location]);

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

  // Function to generate blur URL using Cloudinary
  const generateBlurUrl = (url: string) => {
    return url.replace("/upload/", "/upload/w_100,c_scale,q_auto,f_auto/");
  };

  // Function to handle image changes
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: any = Array.from(e.target.files);

      // Prevent adding more than 4 image files
      if (files.length + fields.images.length > 4) {
        alert("You can only upload up to 4 files.");
        e.target.value = "";
        return;
      }

      // Prevent adding duplicate image files
      for (const file of files) {
        if (fields.images.some((image) => image.name === file.name)) {
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
        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
          // Upload image to cloudinary
          const res = await axios.post("/api/uploadImage", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          const secureUrl = res.data.secure_url;
          const publicId = res.data.public_id;

          const uploadedImage = {
            name: file.name,
            url: secureUrl,
            public_id: publicId,
            blurDataURL: generateBlurUrl(secureUrl),
          };

          setFields((prev) => ({
            ...prev,
            images: [...prev.images, uploadedImage],
          }));

          // Upload image metadata to db
          const imagesFormData = new FormData();

          for (const image of [...fields.images, uploadedImage]) {
            const imageMetadata = JSON.stringify({
              url: image.url,
              public_id: image.public_id,
            });
            imagesFormData.append("images", imageMetadata);
          }
          const res2 = await fetch(`/api/properties/${id}`, {
            method: "PUT",
            headers: {
              "X-Request-Type": "imagesformdata", // Custom header to differentiate
            },
            body: imagesFormData,
          });

          if (!res2.ok) {
            throw new Error("Failed to update image metadata");
            toast.error("Failed to update images");
          }
          toast.success("Images updated successfully");
        } catch (err: any) {
          console.error("Upload error", err);
        } finally {
          setUploading(false);
        }
      }
    }
  };

  // Function to handle image deletion
  const handleDeleteImage = async (index: number) => {
    // Delete image from cloudinary
    const image = fields.images[index];
    const res = await fetch("/api/deleteImage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id: image.public_id }),
    });
    if (!res.ok) throw new Error("Failed to delete image from cloudinary");

    const newImages = [...fields.images];
    newImages.splice(index, 1);
    setFields((prev) => ({ ...prev, images: newImages }));

    // Delete image metadata from db
    const imagesFormData = new FormData();
    for (const image of newImages) {
      const imageMetadata = JSON.stringify({
        url: image.url,
        public_id: image.public_id,
      });
      imagesFormData.append("images", imageMetadata);
    }
    const res2 = await fetch(`/api/properties/${id}`, {
      method: "PUT",
      headers: {
        "X-Request-Type": "imagesformdata", // Custom header to differentiate
      },
      body: imagesFormData,
    });

    if (!res2.ok) {
      throw new Error("Failed to update image metadata");
      toast.error("Failed to update images");
    }
    toast.success("Images updated successfully");
  };

  const handleClick = () => {
    if (fields.images.length >= 4) return alert("Max 4 images allowed");
    fileInputRef.current?.click();
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fields.images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    if (!location) return toast.error("Please select a location.");

    const formData = new FormData();

    for (const image of fields.images) {
      const metadata = JSON.stringify({
        url: image.url,
        public_id: image.public_id,
      });
      formData.append("images", metadata);
    }
    // Add other form fields
    const form = e.currentTarget;
    const formElements = new FormData(form); // grabs other fields (title, description, etc.)

    for (const [key, value] of formElements.entries()) {
      if (key !== "images") {
        formData.append(key, value);
      }
    }

    formData.append("lat", fields.lat);
    formData.append("lng", fields.lng);

    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: {
          "X-Request-Type": "formdata", // Custom header to differentiate
        },
        body: formData,
      });

      if (response.status === 200) {
        toast.success("Property Updated successfully");
        router.push(`/properties/${id}`);
      } else if (response.status === 401 || response.status === 403) {
        toast.error("Unauthorized");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong!");
    }
  };

  // get property data to show in the form

  useEffect(() => {
    setMounted(true);
    const fetchPropertyData = async () => {
      try {
        const propertyData = await fetchPropertyById(id);

        // check if any value is null and replace with empty string

        if (propertyData && propertyData.rates) {
          const updatedRates = { ...propertyData.rates };
          for (const key in updatedRates) {
            if (updatedRates[key] === null) {
              updatedRates[key] = "";
            }
          }
          propertyData.rates = updatedRates;
        }

        // Parse the database images array

        if (propertyData && propertyData.images) {
          const updatedImages: {}[] = [];
          for (const str of propertyData.images) {
            updatedImages.push(JSON.parse(str));
          }
          propertyData.images = updatedImages;
        }

        setFields(propertyData);
        setLocation({
          lat: parseFloat(propertyData.lat),
          lng: parseFloat(propertyData.lng),
        });
        console.log(propertyData);
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyData();
  }, []);

  return (
    mounted && (
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-bold font-Title2 mb-6">
          Edit Property
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
            <option value="" disabled>
              Select Type
            </option>
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
          {!mapEdit && location && (
            <div
              onClick={() => setMapEdit(true)}
              className="border border-black rounded p-4"
            >
              <p className="text-center -mt-1 mb-2 text-sm md:text-base">
                If you wish to change the location, click on the map
              </p>
              <MapViewer lat={location.lat} lng={location.lng} />
            </div>
          )}
          {mapEdit && (
            <LocationPicker
              onLocationSelect={(coords) => setLocation(coords)}
            />
          )}
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
            <br />
            <span className="text-red-800 text-sm">
              Note: Changes to images (additions and removals) are saved
              automatically.
            </span>
          </label>
          <div
            onClick={handleClick}
            className="border rounded-lg w-full py-2 px-3 cursor-pointer linkbuttondark"
          >
            <p className="opacity-75 text-white text-center mb-1 font-semibold">
              Click to add images
            </p>
            <p className="opacity-60 text-center text-sm text-white">
              {" "}
              <Typewriter
                text={`You have successfully uploaded ${fields.images.length} image(s)`}
                key={fields.images.length}
                speed={50}
              />
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

          <div className="mx-auto w-fit">
            {fields.images.length > 0 && (
              <ol className="m-2 grid gap-2 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-gray-600 list-decimal">
                {fields.images.map((img, index) => (
                  <li
                    key={index}
                    className="w-40 h-40 flex flex-col justify-center items-center"
                  >
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline mr-1.5 text-xs text-gray-600"
                    >
                      {(img.name || img.url).slice(0, 20)}
                    </a>
                    {img.url && (
                      <div className="my-1 rounded-lg shadow-sm shadow-black ring-1 ring-orange-300 relative w-20 h-20">
                        <Image
                          key={retryKey}
                          src={img.url}
                          alt={"image preview"}
                          quality={2}
                          fill={true}
                          priority={false}
                          loading="eager"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 30vw, 20vw"
                          className="object-cover"
                          onError={() => {
                            if (retryKey < 4) {
                              setRetryKey((prev) => prev + 1);
                            }
                          }}
                          placeholder="blur"
                          blurDataURL={
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOU/yBeDwAEAwGn+/WEEgAAAABJRU5ErkJggg=="
                          }
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      className="cursor-pointer text-sm rounded-md mt-1 p-1 pr-1.5 pb-1.5 text-red-800 ring-1 hover:ring-2 active:ring-2"
                      onClick={() => handleDeleteImage(index)}
                    >
                      ❌ Delete
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
        {uploading && (
          <div className="w-full mx-auto m-2 h-7 bg-yellow-300 rounded-lg">
            <div className="h-7 bg-yellow-400 rounded-lg animate-pulse w-full flex justify-center text-gray-700 text-shadow text-shadow-blue-950 font-semibold">
              <div className="w-36">
                <Typewriter text="Uploading image ..." speed={50} />
              </div>
            </div>
          </div>
        )}
        <div>
          <button
            className="linkbuttondark text-white cursor-pointer font-bold py-2 px-4 rounded-full w-full"
            type="submit"
            disabled={uploading}
          >
            Update Property
          </button>
        </div>
      </form>
    )
  );
};

export default PropertyEditForm;
