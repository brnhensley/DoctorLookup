import { DoctorLookup } from './doctorLookup.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function () {
  $('#drSearch').submit(function (event) {
    event.preventDefault();
    $('#showDrs').text("");
    let drName = $('#drname').val();
    let medIssue = $('#medissue').val();
    $('#drname').val("");
    $('#medissue').val("");
    console.log("drName" + drName + " " + "medIssue" + medIssue);
    let doctorLookup = new DoctorLookup;
    let promise = doctorLookup.findDr(drName, medIssue);
    promise.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      if (body.data.length === 0) { // IS THIS DATA AN ARRAY?
        $('#showDrs').text(`There are no doctors in Portland that match the search criteria.`)
      } else {
        body.data.forEach(function (dr) {
          $('#showDrs').append(`${dr.profile.title} ${dr.profile.first_name} ${dr.profile.last_name}<br>
          ${dr.practices.visit_address.street}<br>
          ${dr.practices.visit_address.city}, ${dr.practices.visit_address.state} ${dr.practices.visit_address.zip}<br>
          ${dr.practices.phones.number}<br>
          <a href='${dr.profile.website}'>${dr.practices.website}</a><br>
          Accepting new patients: ${dr.practices.accepts_new_patients}<br>
          ${dr.profile.bio}<hr>`)
        }, function (error) {
          $('#showError').text(`There was an error processing your request: ${error.message}`);
        })
      }
    })
  })
});

`https://api.betterdoctor.com/2016-03-01/doctors?name=${drName}&query=${medIssue}&location=or-portland&sort=first-name-asc&skip=0&limit=10&user_key=${process.env.apiKey}`
