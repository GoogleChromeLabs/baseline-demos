// React stuff
import React, { StrictMode, useState, useEffect } from "react";

// Custom components
import { GalleryItem } from "./GalleryItem.jsx";

// Image metadata
import images from "./images.js";

export default function App () {
  const initialItems = images;
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ filteredItems, setFilteredItems ] = useState();

  function handleSearchTerm (event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    let filteredData;

    if (searchTerm.length === 0) {
      filteredData = initialItems;
    } else {
      filteredData = initialItems.filter(item => {
        const lowCaseSearchTerm = searchTerm.toLowerCase();

        return item.name.toLowerCase().includes(lowCaseSearchTerm) || item.credit.toLowerCase().includes(lowCaseSearchTerm);
      });
    }

    const results = filteredData.map(({ name, link, img, credit, licenseLink, license, duration }, index) => {
      return (
        <GalleryItem name={name} link={link} img={img} key={index} credit={credit} licenseLink={licenseLink} license={license} duration={duration} />
      );
    });

    setFilteredItems(results);
  }, [ searchTerm, initialItems ]);

  return (
    <StrictMode>
      <h1>
        JWST image gallery
      </h1>
      <form className="gallery-search">
        <input
          className="gallery-search-input"
          id="gallery-search"
          type="text"
          name="gallery-search"
          value={searchTerm}
          placeholder="Search for JWST images..."
          onChange={handleSearchTerm}
        />
      </form>
      <ul className="jwst-gallery">
        {filteredItems}
      </ul>
      <footer>
        <p>&copy; 2025 — All rights reserved by creators and contributors where shown.</p>
      </footer>
    </StrictMode>
  );
}
