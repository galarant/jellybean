import 'angular/angular';
import 'angular-route/angular-route.js';

import { HomeController } from "./home/ctrl.js";

angular.module("jellybean", [
  "ngRoute"
  ])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/static/home/home.html"
      })
      .otherwise({
        redirectTo: "/"
      });
  }]);

angular.module("jellybean")
  .controller("HomeController", [ HomeController ]);
