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
    // console.log(process.env.API_KEY)
    console.log("dr Name: ", drName, " ", "med Issue: " + medIssue);
    let doctorLookup = new DoctorLookup;
    let promise = doctorLookup.findDr(drName, medIssue);
    promise.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      console.log(body.data.length);
      console.log(body.data[0].profile.first_name, " ", body.data[0].practices[0].visit_address.street);
      if (body.data.length === 0) {
        $('#showDrs').text(`There are no doctors in Portland that match the search criteria.`)
      } else {
        body.data.forEach(function (dr) {
          $('#showDrs').append(`${dr.profile.title} ${dr.profile.first_name} ${dr.profile.last_name}<br>
          ${dr.practices[0].visit_address.street}<br>
          ${dr.practices[0].visit_address.city}, ${dr.practices[0].visit_address.state} ${dr.practices[0].visit_address.zip}<br>
          ${dr.practices[0].phones[0].number}<br>
          <a href='${dr.profile.website}'>${dr.practices[0].website}</a><br>
          Accepting new patients: ${dr.practices[0].accepts_new_patients}<br>
          ${dr.profile.bio}<hr>`)
        }, function (error) {
          $('#error').text(`There was an error processing your request: ${error.message}`);
        })
      }
    })
  })
});
