# Live Preview

Update your build while you are changing HTML files.

## Features

No server is needed, no coninuous compilation.

## Requirements

You have to build your app first: ng build
Than you have to copy the content of your dist directory into a live-preview directory.

Why?

This extension will work on the live-preview folder and you will be able to compare the preview with the last build.
If you still want to work on dist folder insted, you have to update the mainBundleJsPath property of this extension configuration to point to your .\\..\\dist\\main.bundle.js file.

## Extension Settings

None

## Known Issues

Works only for HTML files that existed at the time the build was created.

## Release Notes

### 0.0.1
Write your HTML changes in the build code while you are typing.

-----------------------------------------------------------------------------------------------------------

**Enjoy!**