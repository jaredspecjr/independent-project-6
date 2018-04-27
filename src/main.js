import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// import {} from './businessLogic.js';

$(document).ready(function(){
  $("#doctorSearch").click(function(){
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
      request.open("get", url, true);
      request.send();
    });

    promise.then(function(response){
      let body = JSON.parse(response);
      for(let i = 0; i <= body.data.length; i++){

        if(body.data[i].practices.length === 0){
          $(".showDoctors").append("Sorry there are no results, Please try another search");
        } else {
          console.log(body.data[0].practices);
          console.log(i);
          $(".showDoctors").append(`${body.data[i].profile.first_name}` + " " + `${body.data[i].profile.last_name}` + "<br>" + `${body.data[i].practices[i].visit_address.street}` + "<br>" + `${body.data[i].practices[0].phones[0].number}` + "<br>");
          if(body.data[i].practices[0].accepts_new_patients === true){
            $(".showDoctors").append("Accepts new patients" + "<br>" + "<br>");
          } else {
            $(".showDoctors").append("Does not accept new patients" + "<br>" + "<br>");
          }

        }
      }
    }, function(error){
      $(".errors").text(`There was an error processing your request: ${error.message}`);
    });
  });
});
