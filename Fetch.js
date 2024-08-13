"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Fetch({ data, onDelete }) {
 // console.log(data)
  return (
    <div className="flex w-full">
      <div className="p-3">
        <ul className="text-xl list-disc">
          {data.map((item) => (
            <li key={item.id}>
              <FontAwesomeIcon
                icon={faTrash}
                className="pr-3 cursor-pointer"
                onClick={() => onDelete(item.id)}
              />
              <b>{item.title}</b>
              <br />
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Fetch;
