import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// import {} from './businessLogic.js';

$(document).ready(function(){
  $("#doctorSearch").click(function(){
    let city = $("#location").val();
    $("#location").val("");
  });
});
