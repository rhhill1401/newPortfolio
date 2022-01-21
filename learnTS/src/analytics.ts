console.log('analytics file');
let logged;

function sendAnalytics(data: string) {
  console.log(data);
  logged = 'this';
}
sendAnalytics('the data');
