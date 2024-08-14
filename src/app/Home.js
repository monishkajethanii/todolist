import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import Fetch from "../../Fetch";
import Download from "./Download";

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);
  const [taskNo, setTaskNo] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/cats");
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: taskNo,
          title: taskTitle,
          description: taskDesc,
        }),
      });

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (response.ok) {
          const updatedResponse = await fetch("/api/cats");
          const updatedData = await updatedResponse.json();
          setData(updatedData);
        } else {
          console.error("Error:", result.error);
        }
      } else {
        const errorText = await response.text();
        //console.error("Unexpected response format:", errorText);
      }
    } catch (error) {
      console.error("Error adding:", error);
    }
    setTaskNo("");
    setTaskTitle("");
    setTaskDesc("");
    fetchTasks();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/cats?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Deleted successfully");
        fetchTasks();
      } else {
        console.error("Failed to delete", await response.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full">
      <div className="w-2/5 bg-gray-200 text-lg shadow-xl">
        <FontAwesomeIcon icon={faUser} className="pr-3 pl-3 text-gray-500" />
        <p className="inline">Monishka</p>
        <div>
          <FontAwesomeIcon icon={faPlus} className="pl-3 pt-5 text-red-500" />
          <button
            className="p-3 inline text-red-500 font-bold"
            onClick={toggleVisibility}
          >
            Add Task
          </button>
        </div>
        <ul>
          <li>
            <FontAwesomeIcon
              icon={faCalendarWeek}
              className="pl-8 pt-5 text-red-500"
            />
            <a className="p-3 inline focus:text-red-500 font-bold" href="/">
              Today
            </a>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCalendarWeek}
              className="pl-8 pt-5 text-red-500"
            />
            <a className="p-3 inline font-bold focus:text-red-500" href="/">
              Upcoming
            </a>
          </li>
        </ul>
        <div>
          <FontAwesomeIcon icon={faUser} className="pl-3 pt-5 text-gray-500" />
          <a className="inline pl-3">My Projects</a>
        </div>
        <div>
          <Fetch data={data} onDelete={handleDelete} />
          <Download data={data}/>
        </div>
      </div>
      <div className="w-3/5">
        <p className="text-center font-bold text-4xl p-3 text-gray-500">
          Today
        </p>
        <p className="text-center font-bold text-2xl p-3 text-gray-300">
          My Projects
        </p>
        <hr />
        {isVisible && (
          <div
            className="flex flex-col p-4 bg-yellow-50 justify-center items-center min-h-screen"
            id="task"
          >
            <div className="bg-gray-500 shadow-2xl w-full max-w-md p-4 rounded-lg flex flex-col space-y-4 items-center h-full">
              <div className="bg-white w-full p-4 rounded-lg flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Task No"
                  value={taskNo}
                  onChange={(e) => setTaskNo(e.target.value)}
                  className="border border-gray-500 text-center rounded-lg p-2 w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Task Title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="border border-gray-500 text-center rounded-lg p-2 w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Task Description"
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="border border-gray-500 text-center rounded-lg p-2 w-full"
                  required
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="border-2 border-red-600 bg-red-500 text-white rounded-lg py-2 w-full font-bold hover:bg-red-600 transition duration-300"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <hr />
        <FontAwesomeIcon icon={faPlus} className="pl-3 pt-5 text-red-500" />
        <button
          className="p-3 inline text-gray-500 font-bold"
          onClick={toggleVisibility}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Home;
