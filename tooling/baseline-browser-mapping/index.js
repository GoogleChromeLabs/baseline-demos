import { getCompatibleVersions } from "baseline-browser-mapping";

console.log(getCompatibleVersions({
  includeDownstreamBrowsers: true,
}).map(({browser, version}) => `${browser} ${version}`).join("\n"));
