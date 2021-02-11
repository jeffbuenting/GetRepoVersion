const core = require('@actions/core');
const github = require('@actions/github');



if ( fs.access( './modulename.psd1', fs.F_OK, (err) => {
    if (err) {
      console.error(err)
      return
    }
  } ) ) {

  const result = await fs.readFile(fileName, "utf-8");

}

console.log( result )


  // core.setOutput('data', result);