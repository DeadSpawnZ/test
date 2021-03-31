const app = require('./app.js');

async function main(){
    await app.listen(app.get('port'));
    await console.log(app.get('appName'));
    console.log('Api on port', app.get('port'));
}

main();