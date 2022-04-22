function _replaceStyle ($head, existingStyle, style) {
    const styleTag = _styleTag(style);

    if (existingStyle) {
      Cypress.$(existingStyle).replaceWith(styleTag);
    } else {
      // no existing style at this index, so no more styles at all in
      // the head, so just append it
      $head.append(styleTag);
    }
}

function _styleTag (style) {
    return `<style>${style}</style>`;
}

// original writeFile function from sources (got from DevTools)

// function writeFile(fileName, contents, encoding, options = {}) {
//     let userOptions = options;

//     if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(encoding)) {
//       userOptions = encoding;
//       encoding = undefined;
//     }

//     options = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.defaults({}, userOptions, {
//       // https://github.com/cypress-io/cypress/issues/1558
//       // If no encoding is specified, then Cypress has historically defaulted
//       // to `utf8`, because of it's focus on text files. This is in contrast to
//       // NodeJs, which defaults to binary. We allow users to pass in `null`
//       // to restore the default node behavior.
//       encoding: encoding === undefined ? 'utf8' : encoding,
//       flag: userOptions.flag ? userOptions.flag : 'w',
//       log: true,
//       timeout: Cypress.config('defaultCommandTimeout')
//     });
//     const consoleProps = {};

//     if (options.log) {
//       options._log = Cypress.log({
//         message: fileName,
//         timeout: options.timeout,

//         consoleProps() {
//           return consoleProps;
//         }

//       });
//     }

//     if (!fileName || !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(fileName)) {
//       _cypress_error_utils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].throwErrByPath('files.invalid_argument', {
//         onFail: options._log,
//         args: {
//           cmd: 'writeFile',
//           file: fileName
//         }
//       });
//     }

//     if (!(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(contents) || lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(contents))) {
//       _cypress_error_utils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].throwErrByPath('files.invalid_contents', {
//         onFail: options._log,
//         args: {
//           contents
//         }
//       });
//     }

//     if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(contents) && !Buffer.isBuffer(contents)) {
//       contents = JSON.stringify(contents, null, 2);
//     } // We clear the default timeout so we can handle
//     // the timeout ourselves


//     cy.clearTimeout();
//     return Cypress.backend('write:file', fileName, contents, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(options, 'encoding', 'flag')).timeout(options.timeout).then(({
//       filePath,
//       contents
//     }) => {
//       consoleProps['File Path'] = filePath;
//       consoleProps['Contents'] = contents;
//       return null;
//     }).catch(err => {
//       if (err.name === 'TimeoutError') {
//         return _cypress_error_utils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].throwErrByPath('files.timed_out', {
//           onFail: options._log,
//           args: {
//   cmd: 'writeFile',
//   file: fileName,
//   timeout: options.timeout
//           }
//         });
//       }

//       return _cypress_error_utils__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].throwErrByPath('files.unexpected_error', {
//         onFail: options._log,
//         args: {
//           cmd: 'writeFile',
//           action: 'write',
//           file: fileName,
//           filePath: err.filePath,
//           error: err.message
//         }
//       });
//     });
//   }


export const recordDOM_Snapshot = () => {
    const snap = Cypress.cy.createSnapshot("snap");
    const { headStyles } = Cypress.cy.getStyles(snap);
    const $head = Cypress.$autIframe.contents().find("head");
    $head.find("script").empty();
    const existingStyles = $head.find('link[rel="stylesheet"],style');

    headStyles.forEach((style,index) => {
        if(style.href){
            //
        }
        else{
            _replaceStyle($head,existingStyles[index],style);
        }
    });
    
    const XMLS = new XMLSerializer();
    let s ='<html>\n' + XMLS.serializeToString(Cypress.$autIframe.contents().find('head')[0]);
    s += XMLS.serializeToString(snap.body.get()[0]) + '\n</html>\n';
    // first way
    // Cypress.Commands._commands.writeFile.fn(`${Cypress.spec.name}.html`,s);

    // second way
    Cypress.backend('write:file', `${Cypress.spec.name}.html`, s);
};