import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./Adult.css";

function Adult() {
  const [state, setState] = useState({
    list: [],       // List of movies
    loading: true,  // Loading state
    error: null,    // Error state
    currentPage: 1, // Current page
    itemsPerPage: 10 // Number of items per page
  });

  useEffect(() => {
    // Fetch movies of type 'adult' from the new URL
    fetch('https://realworldback.onrender.com/movies/type/adult', { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Ensure data is an array before updating state
        console.log(data, "kl");
        setState(prevState => ({
          ...prevState,
          list: data, // Safeguard to ensure list is an array
          loading: false,
          error: null
        }));
      })
      .catch((error) => {
        setState(prevState => ({
          ...prevState,
          list: [], // Ensure list is an array even in case of error
          loading: false,
          error: error.message
        }));
      });

  }, []); // Empty dependency array to run only once on component mount
  useEffect(()=>{
    const injectScript = () => {
      const container = document.getElementById('co');
      if (container) {
        const script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.innerHTML = `
          atOptions = {
            'key' : 'ecb9c1c20c12ade59f6c67b88a62bf53',
		'format' : 'iframe',
		'height' : 60,
		'width' : 468,
		'params' : {}
          };
        `;
        container.appendChild(script1);

        const script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.src = `//www.topcreativeformat.com/ecb9c1c20c12ade59f6c67b88a62bf53/invoke.js`;
        script2.onload = () => console.log(`Ad script successfully loaded in `);
        script2.onerror = () => console.error(`Failed to load ad script in `);
        container.appendChild(script2);
      } else {
        console.error(`Container with ID not found`);
      }
    };

    injectScript();
  })
  // Destructure state object
  const { list, loading, error, currentPage, itemsPerPage } = state;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setState(prevState => ({
        ...prevState,
        currentPage: newPage
      }));
    }
  };

  // Conditional rendering based on loading, error, and data state
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="ad">
     <center><div id="co"></div></center> 
      <center><h1>Adult Movies</h1></center> 
      <ul className="adult-ul">
        {currentItems.map((movie) => (
          <a href={movie.movielink} key={movie.id}>
            <li className="adult">
              <div>
                <video className="v" >
                  <source src={movie.movielink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <center><p>{movie.moviename}</p></center> 
              </div>
            </li>
          </a>
        ))}
      </ul>
     <center> <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div></center>
      <div id="co"></div>
    </div>
  );
}

export default Adult;