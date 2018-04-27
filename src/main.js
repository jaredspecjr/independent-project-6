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
      let url = ``;
      request.onload = fucntion(){
        if (this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request("get", url, true);
    });

    promise.then(function(response){
      body = JSON.parse(response);
    }, function(error){

    });
  });
});
