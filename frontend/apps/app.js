import "angular/angular";
import "angular-route/angular-route.js";

import { GuinGame } from "./game";

angular.module("guin", [])
  .controller("GuinController", [ function() { var game = new GuinGame(); }]);
