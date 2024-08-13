"use client";
import React from 'react';

function Fetch({data}) {
  //const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/cats');
  //       if (response.ok) {
  //         const result = await response.json();
  //         setData(result);
  //       } else {
  //         console.error('Error fetching data:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className='flex w-full'>
      <div className="p-3">
        <ul className="text-xl list-disc">
          {data.map((item) => (
            <li key={item.id}>
              <b>{item.title}</b><br />
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Fetch;
