import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// import {} from './businessLogic.js';

$(document).ready(function(){
  $("#doctorSearch").click(function(){
    debugger;
    let search = $("#search").val(); //changed location to search
    $("#search").val("");
    let promise = new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${search}&skip=2&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = function(){
        if (this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request("get", url, true);
    });

    promise.then(function(response){
      let body = JSON.parse(response);
      $(".showDoctors").append(`${body.data.profile.first_name}`)
    }, function(error){
      $(".showErrors").text(`There was an error processing your request: ${error.message}`);
    });
  });
});
