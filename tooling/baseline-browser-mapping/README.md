# baseline-browser-mapping

`baseline-browser-mapping` exposes arrays of browsers compatible with Baseline Widely available and specified Baseline year feature sets. You can use `baseline-browser-mapping` to help you determine minimum browser version support for your chosen Baseline feature set.

## getCompatibleVersions

In [`index.js`](index.js), call `getCompatibleVersions` and log the result:

```js
import { getCompatibleVersions } from "baseline-browser-mapping";

console.log(getCompatibleVersions({
  includeDownstreamBrowsers: true,
}).map(({browser, version, release_date}) => `${browser} ${version} (${release_date})`).join("\n"));
```

Run the script:

```sh
node index.js
```

Output:

```
chrome 107 (2022-10-27)
chrome_android 107 (2022-10-27)
edge 107 (2022-10-27)
firefox 104 (2022-08-23)
firefox_android 104 (2022-08-23)
safari 16 (2022-09-12)
safari_ios 16 (2022-09-12)
opera 93 (2022-11-17)
opera_android 73 (2023-01-17)
samsunginternet_android 21.0 (2023-05-19)
webview_android 107 (2022-10-25)
ya_android 23.1 (2023-01-10)
qq_android 14.2 (2023-10-14)
```
