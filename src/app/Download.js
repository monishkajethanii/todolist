import React from "react";
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFileArrowDown} from "@fortawesome/free-solid-svg-icons";

function Download({data}) {
  const download = () => {
    const arrayData=Array.isArray(data) ? data:[]
    const textContent = arrayData
      .map(item => `${item.title}: ${item.description}`)
      .join('\n');
    console.log(arrayData)
    const doc = new jsPDF();
    doc.text(textContent, 10, 10);
    doc.save("test.pdf");
  };
  return (
    <div>
      <button onClick={download} className="border-2 border-gray-600 p-3 rounded-lg hover:bg-gray-600 hover:text-white ml-3 mt-2"> <FontAwesomeIcon icon={faFileArrowDown} /> Download</button>
    </div>
  );
}

export default Download;