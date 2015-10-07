### App Plug Test

Simple test to see if we can install plugins without adding them to the `package.json` file

### How to use

* Create a directory in the `./plugins` directory. Example: `foo-bar`
* In your new directory, add your plugin code. Expose it in the `index.js` file
* Now you can `require` your plugin by name!
 * Example: `var fooBar = require('fooBar');`

## TODO

* Figure out a good naming scheme for plugins
* Read from `package.json` to determine plugin name?
* Install plugin dependencies when loading plugins!
* Create tests
* Document, Document, Document!
