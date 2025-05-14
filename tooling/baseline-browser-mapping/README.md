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
chrome 106
chrome_android 106
edge 106
firefox 104
firefox_android 104
safari 16
safari_ios 16
opera 92
opera_android 72
samsunginternet_android 20.0
webview_android 106
ya_android 22.11
qq_android 14.2
```
