# jxa

application management by jxa

# environment

node v16.13.2

`sw_vers` is

```
ProductName:	macOS
ProductVersion:	11.6
BuildVersion:	20G165
```

# set up

```shell
yarn
```

# usage

to clear all desktops (spaces)

```shell
yarn clear
```

to create a new desktop or open some applications, see next section

# extend

create a script like `src/clear.ts` and add some property to `scripts` in `package.json` imitating clear

in `src/applications`, following functions are defined

```typeScript
// src/applications/chrome.ts
openChrome
openChromeTabs

// src/applications/closeApps.ts
closeApps

// src/applications/slack.ts
openSlack

// src/applications/space.ts
openSpace
clearSpaces

// src/applications/terminal.ts
openTerminal

// src/applications/vscode.ts
openVSCode
```

# for more developments

## src/utils/printer.ts

`printStatement` exported from `src/utils/printer.ts` is a debug tool to log ui elements recursively

```typeScript
run((printStatement) => {
  const print = eval(printStatement);
  // print(***)
}, printStatement);
```

for more detail, see `openSpace` function in `src/applications/terminal.ts`
