// Import images:
import img001 from "../img/001.jpg";
import img002 from "../img/002.jpg";
import img003 from "../img/003.jpg";
import img004 from "../img/004.jpg";
import img005 from "../img/005.jpg";
import img006 from "../img/006.jpg";
import img007 from "../img/007.jpg";
import img008 from "../img/008.jpg";
import img009 from "../img/009.jpg";
import img010 from "../img/010.jpg";
import img011 from "../img/011.jpg";
import img012 from "../img/012.jpg";
import img013 from "../img/013.jpg";
import img014 from "../img/014.jpg";
import img015 from "../img/015.jpg";
import img016 from "../img/016.jpg";
import img017 from "../img/017.jpg";
import img018 from "../img/018.jpg";
import img019 from "../img/019.jpg";
import img020 from "../img/020.jpg";
import img021 from "../img/021.jpg";
import img022 from "../img/022.jpg";
import img023 from "../img/023.jpg";
import img024 from "../img/024.jpg";
import img025 from "../img/025.jpg";
import img026 from "../img/026.jpg";
import img027 from "../img/027.jpg";
import img028 from "../img/028.jpg";
import img029 from "../img/029.jpg";
import img030 from "../img/030.jpg";
import img031 from "../img/031.jpg";
import img032 from "../img/032.jpg";
import img033 from "../img/033.jpg";
import img034 from "../img/034.jpg";
import img035 from "../img/035.jpg";

const initialItems = [
  {
    name: "Phoenix Galaxy Cluster",
    img: img001,
    credit: "NASA, CXC, NRAO, ESA, Michael McDonald (MIT)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/54324515037/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 8,
      hours: 4
    }
  },
  {
    name: "Leo P",
    img: img002,
    credit: "NASA, ESA, CSA, Kristen McQuinn (STScI)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/54319737603/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 9,
      hours: 14
    }
  },
  {
    name: "Dust in the (stellar) wind",
    img: img003,
    credit: "ESA/Webb, NASA & CSA, Tazaki et al.",
    link: "https://www.flickr.com/photos/nasawebbtelescope/54306594896/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 4,
      hours: 1
    }
  },
  {
    name: "NGC 602",
    img: img004,
    credit: "X-ray: NASA/CXC; Infrared: ESA/Webb, NASA & CSA, P. Zeilder, E.Sabbi, A. Nota, M. Zamani; Image Processing: NASA/CXC/SAO/L. Frattare and K. Arcand",
    link: "https://www.flickr.com/photos/nasawebbtelescope/54213487373/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 11,
      hours: 16
    }
  },
  {
    name: "NGC 2566",
    img: img005,
    credit: "ESA/Webb, NASA & CSA, A. Leroy",
    link: "https://www.flickr.com/photos/nasawebbtelescope/54213026331/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 9,
      hours: 6
    }
  },
  {
    name: "Spiderweb protocluster",
    img: img006,
    credit: "ESA/Webb, NASA & CSA, H. Dannerbauer",
    link: "https://www.flickr.com/photos/nasawebbtelescope/54183500660/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 7,
      hours: 7
    }
  },
  {
    name: "NGC 2090",
    img: img007,
    credit: "ESA/Webb, NASA & CSA, A. Leroy",
    link: "https://www.flickr.com/photos/nasawebbtelescope/54167157727/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 3,
      hours: 14
    }
  },
  {
    name: "IC 2163 and NGC 2207",
    img: img008,
    credit: "NASA, ESA, CSA, STScI",
    link: "https://www.flickr.com/photos/nasawebbtelescope/54107470055/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 5,
      hours: 2
    }
  },
  {
    name: "M74",
    img: img009,
    credit: "ESA/Webb, NASA & CSA, A. Adamo (Stockholm University) and the FEAST JWST team",
    link: "https://www.flickr.com/photos/nasawebbtelescope/54102426319/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 13,
      hours: 3
    }
  },
  {
    name: "Arp 107",
    img: img010,
    credit: "NASA, ESA, CSA, STScI",
    link: "https://www.flickr.com/photos/nasawebbtelescope/54003266552/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 9,
      hours: 8
    }
  },
  {
    name: "Digel Clouds",
    img: img011,
    credit: "NASA, ESA, CSA, STScI, Michael Ressler (NASA-JPL)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53989782746/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 17,
      hours: 23
    }
  },
  {
    name: "MACS-J0417.5-1154 cluster",
    img: img012,
    credit: "NASA, ESA, CSA, STScI, Vicente Estrada-Carpenter (Saint Mary's University)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53970855226/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 13,
      hours: 1
    }
  },
  {
    name: "Cosmic question mark",
    img: img013,
    credit: "NASA, ESA, CSA, STScI, Vicente Estrada-Carpenter (Saint Mary's University)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53971042139/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 19,
      hours: 12
    }
  },
  {
    name: "Perseus (NGC 1333)",
    img: img014,
    credit: "ESA/Webb, NASA & CSA, A. Scholz, K. Muzic, A. Langeveld, R. Jayawardhana",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53951942710/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 11,
      hours: 16
    }
  },
  {
    name: "Messier 106",
    img: img015,
    credit: "ESA/Webb, NASA & CSA, J. Glenn",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53912178488/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 9,
      hours: 4
    }
  },
  {
    name: "Arp 142",
    img: img016,
    credit: "NASA, ESA, CSA, STScI",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53851864526/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 11,
      hours: 3
    }
  },
  {
    name: "MACS J0416",
    img: img017,
    credit: "NASA/CXC/SAO/G. Ogrean et al.; Optical/Infrared: (Hubble) NASA/ESA/STScI; IR: (JWST) NASA/ESA/CSA/STScI/Jose M. Diego (IFCA), Jordan C. J. D'Silva (UWA), Anton M. Koekemoer (STScI), Jake Summers (ASU), Rogier Windhorst (ASU), Haojing Yan (University of Missouri)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53849045752/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 5,
      hours: 3
    }
  },
  {
    name: "NGC 3627",
    img: img018,
    credit: "NASA/CXC/SAO; Optical: NASA/ESO/STScI, ESO/WFI; Infrared: NASA/ESA/CSA/STScI/JWST; Image Processing: NASA/CXC/SAO/J. Major",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53850188868/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 15,
      hours: 17
    }
  },
  {
    name: "Orion Nebula Composite",
    img: img019,
    credit: "X-ray: NASA/CXC/SAO/E. Feigelson; IR: NASA/ESA/CSA/STScI; Image Processing: NASA/CXC/SAO/L. Frattare and J. Major",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53849921521/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 19,
      hours: 22
    }
  },
  {
    name: "Rho Ophiuchi Composite",
    img: img020,
    credit: "X-ray: NASA/CXC/MIT/C. Canizares; IR: NASA/ESA/CSA/STScI/K. Pontoppidan; Image Processing: NASA/ESA/STScI/Alyssa Pagan, NASA/CXC/SAO/L. Frattare and J. Major",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53849910476/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 16,
      hours: 17
    }
  },
  {
    name: "Galaxy cluster SPT-CL J0615−5746",
    img: img021,
    credit: "ESA/Webb, NASA & CSA, L. Bradley (STScI), A. Adamo (Stockholm University) and the Cosmic Spring collaboration",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53820174319/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 23,
      hours: 22
    }
  },
  {
    name: "Serpens Nebula",
    img: img022,
    credit: "NASA, ESA, CSA, STScI, Klaus Pontoppidan (NASA-JPL), Joel Green (STScI)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53804051336/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 19,
      hours: 15
    }
  },
  {
    name: "Crab Nebula",
    img: img023,
    credit: "NASA, ESA, CSA, STScI, Tea Temim (Princeton University)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53797673729/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 17,
      hours: 1
    }
  },
  {
    name: "NGC 6440",
    img: img024,
    credit: "ESA/Webb, NASA & CSA, P. Freire; Acknowledgement: M. Cadelano and C. Pallanca",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53691677609/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 7,
      hours: 17
    }
  },
  {
    name: "RX J2129 (Encaustic)",
    img: img025,
    credit: "Holly Streekstra",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53987938703/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 4,
      hours: 13
    }
  },
  {
    name: "Top of Horsehead Nebula",
    img: img026,
    credit: "NASA, ESA, CSA, Karl Misselt (University of Arizona), Alain Abergel (AIM Paris-Saclay)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53686360156/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 5,
      hours: 16
    }
  },
  {
    name: "RX J2129 (Photogram)",
    img: img027,
    credit: "Holly Streekstra",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53988134340/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 15,
      hours: 21
    }
  },
  {
    name: "I Zwicky 18",
    img: img028,
    credit: "ESA/Webb, NASA, CSA, A. Hirschauer, M. Meixner et al.",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53612916394/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 18,
      hours: 17
    }
  },
  {
    name: "NGC 604",
    img: img029,
    credit: "NASA, ESA, CSA, STScI",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53577720515/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 4,
      hours: 11
    }
  },
  {
    name: "NGC 1559",
    img: img030,
    credit: "ESA/Webb, NASA & CSA, A. Leroy, J. Lee and the PHANGS Team",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53554927627/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 14,
      hours: 10
    }
  },
  {
    name: "NGC 4303",
    img: img031,
    credit: "NASA, ESA, CSA, ESO, STScI, Janice Lee (STScI), Thomas Williams (Oxford), PHANGS Team",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53518229247/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 15,
      hours: 22
    }
  },
  {
    name: "NGC 4535",
    img: img032,
    credit: "NASA, ESA, CSA, STScI, Janice Lee (STScI), Thomas Williams (Oxford), PHANGS Team",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53519420679/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 6,
      hours: 15
    }
  },
  {
    name: "IC 5332",
    img: img033,
    credit: "NASA, ESA, CSA, STScI, Janice Lee (STScI), Thomas Williams (Oxford), Rupali Chandar (UToledo), PHANGS Team",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53519198229/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 10,
      hours: 17
    }
  },
  {
    name: "NGC 346",
    img: img034,
    credit: "NASA, ESA, CSA, STScI, Nolan Habel (NASA-JPL). Image Processing: Patrick Kavanagh (Maynooth University)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53248658934/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 19,
      hours: 10
    }
  },
  {
    name: "Arp 220",
    img: img035,
    credit: "NASA, ESA, CSA, STScI with image processing by Alyssa Pagan (STScI)",
    link: "https://www.flickr.com/photos/nasawebbtelescope/53222195326/in/photostream/",
    license: "CC BY 2.0",
    licenseLink: "https://creativecommons.org/licenses/by/2.0/",
    duration: {
      days: 22,
      hours: 17
    }
  }
];

export default initialItems;
