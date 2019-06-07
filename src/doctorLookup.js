export class DoctorLookup
{
  findDr(drName, medIssue){
    return new Promise(funtion(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${drName}&query=${medIssue}&location=or-portland&sort=first-name-asc&skip=0&limit=10&user_key=${process.env.apiKey}`
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

}
