import { getCompatibleVersions } from "baseline-browser-mapping";

console.log(getCompatibleVersions({
  includeDownstreamBrowsers: true,
}).map(({browser, version, release_date}) => `${browser} ${version} (${release_date})`).join("\n"));
