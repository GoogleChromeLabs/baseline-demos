# [Baseline MCP server](https://github.com/yamanoku/baseline-mcp-server)

## VS Code setup

1. Install [deno](https://deno.com/)
2. Open the command palette and search for `Preferences: Open User Settings (JSON)`
3. Add the following config to the JSON settings:
    ```json
    {
      "mcp": {
        "servers": {
          "baseline-mcp-server": {
            "command": "deno",
            "args": [
              "run",
              "--allow-net=api.webstatus.dev",
              "jsr:@yamanoku/baseline-mcp-server"
            ]
          }
        }
      }
    }
    ```

4. Open an MCP-supported client extension like Copilot Chat in Agent mode, which starts the MCP server
5. Select a model like "Claude 3.7 Sonnet"
6. Enter your Baseline-related prompt

## Example

Context: [../eslint/src/test.css](../eslint/src/test.css)

**Prompt**

```
What's the Baseline status of view transitions?
```

**Response**

```
I'll check the Baseline status of view transitions for you.
```

<details>
<summary>Ran `get_web_feature_baseline_status`</summary>

```
{
  "query": "view transitions"
}

##機能
- view transitions: 限定的にサポートされているWeb機能です。一部のブラウザでは使用できないか、フラグが必要な場合があります。
##機能
- view transitions: 限定的にサポートされているWeb機能です。一部のブラウザでは使用できないか、フラグが必要な場合があります。

##ブラウザのサポート状況
- chrome: 126 (2024-06-11), edge: 126 (2024-06-13), safari: 18.2 (2024-12-11)
- chrome: 111 (2023-03-07), edge: 111 (2023-03-13), safari: 18 (2024-09-16)

##機能の使用状況
- 0.561188
- 0.063447

##具体的な機能
- Cross-document view transitions: limited
- View transitions: limited
```
</details>

```
Based on the information I retrieved, here's the Baseline status of view transitions:

View transitions are classified as having "limited" support in the Web Platform. This means it's a feature that is supported by some browsers but not universally available or might require flags to be enabled.

Browser support details:
- Chrome: Version 111 (released March 7, 2023) for basic view transitions and version 126 (expected June 11, 2024) for cross-document view transitions
- Edge: Version 111 (released March 13, 2023) for basic view transitions and version 126 (expected June 13, 2024) for cross-document view transitions 
- Safari: Version 18 (expected September 16, 2024) for basic view transitions and version 18.2 (expected December 11, 2024) for cross-document view transitions

The usage rate is relatively low:
- Cross-document view transitions: 0.561188%
- Basic view transitions: 0.063447%

I notice in your CSS file you're already using `view-transition-name: card-transition` property in the `.card` class, which is part of this feature.
```

**Prompt**

```
What are some other CSS properties I'm using that are also "limited" availability?
```

**Response**

```
I'll check which other CSS properties in your code have "limited" availability status similar to view transitions.

> Ran `get_web_feature_baseline_status` {"query": "container-type"}

I'll check the status of various CSS properties in your code.

> Ran `get_web_feature_baseline_status` {"query": "CSS Container Queries"}

Let me examine each one systematically.

> Ran `get_web_feature_baseline_status` {"query": "css container"}

I'll check the status of the various CSS properties in your code systematically.

> Ran `get_web_feature_baseline_status` {"query": "color-mix"}

Let me try with more specific queries.

> Ran `get_web_feature_baseline_status` {"query": "aspect-ratio"}

I apologize for the difficulty in finding information about the baseline status of CSS properties. Let me try with some other properties from your code to see which ones have limited availability.

> Ran `get_web_feature_baseline_status` {"query": "css has selector"}

I'm checking which other CSS properties in your code have "limited" availability similar to view transitions.

Based on my query for "color-mix", I can see this property is classified as "newly standardized" rather than "limited". It's supported in:
- Chrome 111 (March 2023)
- Edge 111 (March 2023)
- Firefox 113 (May 2023)
- Safari 16.2 (December 2022)

The usage rate is approximately 3.47%, which is relatively higher than view transitions.

Let me check some other properties from your code:

> Ran `get_web_feature_baseline_status` {"query": "aspect-ratio"}

Based on my research, I've checked several CSS properties in your code to see which ones have "limited" availability similar to view transitions. 

The `color-mix()` function is classified as "newly standardized" rather than "limited". It has good support in major browsers since:
- Chrome 111 (March 2023)
- Edge 111 (March 2023) 
- Firefox 113 (May 2023)
- Safari 16.2 (December 2022)
Its usage rate is approximately 3.47%, which is higher than view transitions.

The `aspect-ratio` property is widely supported and classified as a web standard feature that can be safely used in most browsers. It's supported since:
- Chrome 88 (January 2021)
- Edge 88 (January 2021)
- Firefox 89 (June 2021)
- Safari 15 (September 2021)
It has a relatively high usage rate of 27.44%.

Let me check some other properties in your code that might have limited availability:

> Ran `get_web_feature_baseline_status` {"query": "css has selector"}

Based on my research so far, I've checked several CSS properties in your code to identify which ones have "limited" availability similar to view transitions.

Let me continue checking other potentially limited properties in your code:

> Ran `get_web_feature_baseline_status` {"query": "css :has"}
```
