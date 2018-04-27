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
      console.log(body.data[0].profile.first_name);
      for(let i = 0; i <= body.data.length; i++){

        $(".showDoctors").append(`${body.data[i].profile.first_name}`);
      }
    }, function(error){
      $(".errors").text(`There was an error processing your request: ${error.message}`);
    });
  });
});
