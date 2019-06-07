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
      if (body.length === 0) { // IS THIS DATA AN ARRAY?
        $('#showDrs').text(`There are no doctors in Portland that match the search criteria.`)
      } else {
        body.forEach(function (dr) {
          $('#showDrs').append(`${dr.first_name} ${dr.last_name}<br>${dr.address}<br>${dr.city}, ${dr.state}, ${dr.postal_code}<br> ${dr.phone}<br> <a href='${dr.website_url}'>${dr.website_url}</a><hr>`)
        }, function (error) {
          $('#showError').text(`There was an error processing your request: ${error.message}`);
        })
      }
    })
  })
});