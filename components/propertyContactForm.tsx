import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Iproperty } from "@/components/PropertyCard";

const PropertyContactForm = ({property}: {property: Iproperty}) => {
    if (!property) return null
  return (
    <div className="bg-orange-400/90 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none !bg-transparent border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none !bg-transparent border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="shadow appearance-none !bg-transparent border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="shadow appearance-none !bg-transparent border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-1 focus:shadow-outline"
            id="message"
            name="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <button
            className="linkbuttondark cursor-pointer text-white font-bold py-2 px-4 rounded-full w-full
                          flex items-center justify-center outline-1 outline-gray-100"
            type="submit"
          >
            <FaPaperPlane className="mr-2" /> Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
