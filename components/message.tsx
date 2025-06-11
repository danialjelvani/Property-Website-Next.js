import React from "react";

const Message = ({ message }: { message: any }) => {
  return (
    <div className="relative flex flex-col justify-around bg-black/10 rounded-lg h-116 md:h-107 scrollbar overflow-y-scroll snap-y snap-mandatory scroll-smooth snap-center p-4">
      <h2 className="my-4">
        <span className="md:text-xl text-lg font-bold mr-2">
          Property Inquiry:
        </span>
        <span className="text-gray-300">{message.property.name}</span>
      </h2>
      <p className="text-gray-300">{message.body}</p>

      <ul className="mt-4 text-sm">
        <li>
          <strong>Name: </strong>
          <span className="text-gray-800">{message.sender.username}</span>
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-gray-800">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-gray-800">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          <span className="text-gray-800">
            {new Date(message.createdAt).toLocaleString()}
          </span>
        </li>
      </ul>
      <div className="flex gap-3 justify-center md:justify-start md:mt-4">
        <button className="self-start mt-4 linkbuttonred w-35 h-10 text-center text-white px-2 py-2 rounded-md">
          Delete
        </button>
        <button className="self-start mt-4 linkbuttonamber w-35 h-10 text-center text-white px-2 py-2 rounded-md">
          Mark As Read
        </button>
      </div>
    </div>
  );
};

export default Message;
