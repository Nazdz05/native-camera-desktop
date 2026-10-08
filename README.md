# Native Camera Desktop

A desktop wrapper for the local webcam recorder. The same source builds for Windows, macOS, and Linux. It uses Electron to host the existing camera interface; recording stays on the computer and is downloaded to the user's selected/default downloads location.

## Run from source

Install Node.js 20 or newer, then from this folder run:

```sh
npm install
npm start
```

Choose **Connect camera** and allow access when the operating system asks. The attached camera determines the available resolution and manual controls. The app records WebM; HLG HDR, Android ISO controls, and phone multi-lens selection are not available through ordinary desktop webcam capture.

## Build installers

Build the current operating system's package:

```sh
npm run dist:win
npm run dist:mac
npm run dist:linux
```

Or run `npm run dist` to build all three targets where the toolchain permits. Artifacts are written to `release/`.

Build notes:

- Windows installers are NSIS and portable builds.
- macOS output is DMG and ZIP. Signing/notarization requires Apple developer credentials and is not configured here.
- Linux output is AppImage and Debian package.
- Build each target on its native OS for the most reliable result. macOS packages in particular generally need to be built on macOS.
