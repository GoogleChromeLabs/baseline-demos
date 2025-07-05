// React stuff
import { createRoot } from "react-dom/client";

// Components
import App from "./js/App.jsx";

// CSS imports
import "./css/normalize.css"
import "./css/styles.css"

createRoot(document.querySelector("main")).render(<App />);
