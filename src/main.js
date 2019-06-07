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
    let doctorLookup = new DoctorLookup;
    let promise = doctorLookup.findDr(drName, medIssue);
    promise.then(function (response) {
      let body = JSON.parse(response);
      if (body.data.length === 0) {
        $('#showDrs').append(`<h4 class="pretty">There are no doctors in Portland that match the search criteria.</h4>`);
      } else {
        body.data.forEach(function (dr) {
          let newPatients = "";

          if (dr.profile.website === undefined){
            dr.profile.website = "No Website Data";
          }

          if (dr.practices[0].accepts_new_patients === true) {
            newPatients = `${dr.profile.title} ${dr.profile.last_name} is currently accepting new patients.`;
          } else {
            newPatients = `Unfortunately ${dr.profile.title} ${dr.profile.last_name} is currently unable to accept new patients.`;
          }

          $('#showDrs').append(`<div class="pretty">
          <strong>${dr.profile.title} ${dr.profile.first_name} ${dr.profile.last_name}</strong><br>
          <p>${dr.practices[0].visit_address.street}<br>
          ${dr.practices[0].visit_address.city}, ${dr.practices[0].visit_address.state} ${dr.practices[0].visit_address.zip}</p>
          <p>${dr.practices[0].phones[0].number}<br>
          Website: ${dr.profile.website}</p>
          <strong>${newPatients}</strong><br>
          <p><em>${dr.profile.bio}</em></p></div><hr>`);
        }, function (error) {
          $('#error').text(`There was an error processing your request: ${error.message}`);
          $('#error').show();
        });
      }
    });
  });
});
