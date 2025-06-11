import React from "react";
import { useState } from "react";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle  } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { Iproperty } from "@/components/PropertyCard";

const PropertyContactForm = ({ property }: { property: Iproperty }) => {
  if (!property) return null;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      email,
      message,
      phone,
      recipient: property.owner,
      property: property._id,
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.status === 200) {
        setWasSubmitted(true);
        toast.success(resData.message);
      } else if (res.status === 400 || res.status === 401) {
        toast.error(resData.message);
      } else {
        toast.error("Error sending message");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending message");
    } finally {
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
    }
  };

  return (
    <div className="bg-orange-400/90 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {!session ? (
        <div className="text-teal-200 flex justify-around items-center gap-2 text-shadow-[0_0_3px] text-shadow-white/90 mb-4">
          <FaExclamationCircle className="shrink-0 block w-8 text-gray-700 text-lg mt-1" />
          <p className="">You must be logged in to send a message</p>
        </div>
      ) : wasSubmitted ? (
        <div className="text-teal-200 flex justify-around items-center gap-2 text-shadow-[0_0_3px] text-shadow-white/90 mb-4">
          <FaCheckCircle className="shrink-0 block w-8 text-gray-700 text-lg mt-1" />
          <p className="">Your message's been sent successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
      )}
    </div>
  );
};

export default PropertyContactForm;
