/*global angular */
/*global console */
/*global getElementById */
/*global alert */

var myApp = angular.module('myApp', ['ngRoute', 'ngMessages', 'ngAnimate', 'ui.bootstrap']);
myApp.config(function ($routeProvider) {
  'use strict';
  $routeProvider
    .when('/', {
      templateUrl: 'pages/login.html',
      controller: 'loginController',
		  reloadOnSearch: false
    })

    .when('/home', {
      templateUrl: 'pages/home.html',
      controller: 'homeController'
    })
    
    .when('/login', {
      templateUrl: 'pages/login.html',
      controller: 'loginController'
    })
    
    .when('/main', {
      templateUrl: 'pages/main.html',
      controller: 'mainController'
    })
   
    .when('/contacts', {
      templateUrl: 'pages/contacts.html',
      controller: 'contactsController'
    });

});

myApp.service('nameService', function () {
	'use strict';
	var self = this;
	this.name = '';
	this.namelength = function () { return self.name.length; };
});

myApp.factory('$localStorage', [
	'$window', function ($window) {
    'use strict';
    var x, y;
		return {
			setObject: function (x, y) {
        $window.localStorage[x] = JSON.stringify(y);
				if (y) {
          console.log('setLocalData data.length :' + y.length);
        }
			},
			getObject: function (x) {
				x = JSON.parse($window.localStorage[x] || null);
        if (x) {
          console.log('getLocalData data.length :' + x.length);
          return x;
        }
			}
		};
	}
]);

myApp.directive('showErrors', function ($timeout) {
  'use strict';
	return {
		restrict: 'A',
		require: '^form',
		link: function (scope, el, attrs, formCtrl) {
			
			// get the text box element using the query on the name attribute
			var inputEl = el[0].querySelector('[name]');
			
			// convert the native text box element to an angular element
			var inputNgEl = angular.element(inputEl);
			
			// get the name on the text box so we know the property to check
			// on the form controller
			var inputName = inputNgEl.attr('name');
			
			// apply the has-error class when user moves to the next item
			inputNgEl.bind('blur', function () {
				console.log('showErrors blur: [ ' + inputName + ' ] $invalid: ' + formCtrl[inputName].$invalid + ' $dirty: ' + formCtrl[inputName].$dirty);
				el.toggleClass('has-error', formCtrl[inputName].$invalid && formCtrl[inputName].$dirty);
			});
			
			scope.$on('show-errors-change', function () {
				console.log('on show-errors-change: [ ' + inputName + ' ] $invalid: ' + formCtrl[inputName].$invalid + ' $dirty: ' + formCtrl[inputName].$dirty);
				el.toggleClass('has-error', formCtrl[inputName].$invalid && formCtrl[inputName].$dirty);
			});
			
			// show all validity results using the has-error class parameters
			scope.$on('show-errors-check-validity', function () {
				console.log('on show-errors-validity: [ ' + inputName + ' ] $invalid: ' + formCtrl[inputName].$invalid + ' $dirty: ' + formCtrl[inputName].$dirty);
				el.toggleClass('has-error', formCtrl[inputName].$invalid && formCtrl[inputName].$dirty);
			});
			
			// reset all has-xxxxx class parameters
			scope.$on('show-errors-reset', function () {
				$timeout(function () {
					console.log('show-errors-reset: ' + inputName);
					el.removeClass('has-warning');
					el.removeClass('has-success');
					el.removeClass('has-error');
				}, 0, false);
			});
		}
	};
});

myApp.directive('zautoFocus', ['$timeout',
  function ($timeout) {
    'use strict';
    console.log('zauto-focus triggered');
    return {
      restrict: 'A',
      link: function ($scope, $element) {
        $timeout(function () {
          $element[0].focus();
        });
      }
    };
  }
  ]);

myApp.directive('isOpen', function ($timeout) {
  'use strict';
	return {
		restrict: 'A',
    link: function (scope, element, attributes) {
      scope.$watch(function () {
        return element.attr('is-open');
      }, function () {
        //if (!angular.isUndefined('is-open') {
        console.log('directive isOpen is-open : ' + attributes.isOpen);
        //}
      });
    }
  };
});

myApp.directive('showAria', function ($timeout) {
  'use strict';
	return {
		restrict: 'A',
    link: function (scope, element, attributes) {
      scope.$watch(function () {
        return element.attr('aria-expanded');
      }, function () {
        //if (!angular.isUndefined('aria-expanded') {
        console.log('directive showAria aria-expanded : ' + attributes.ariaExpanded);
        //}
      });
    }
  };
});

myApp.directive('searchResult', function () {
	'use strict';
	return {
		restrict: 'AECM',
		templateUrl: './directives/searchresult.html',
		//templateUrl: '/directives/searchresult.html',
		replace: true,
		scope: {
			personObject: '=',
			formattedNameFunction: '&',
			formattedAddressFunction: '&',
			getOnlineLastFunction: '&',
      getDetailsFunction: '&'
		},
		transclude: false,
		link: function (scope, elements, attrs) {
			console.log('Linking searchResult for: ' + scope.personObject.formattedName);
			//console.log(scope);
		}
	};
});

myApp.directive('cardList', function () {
	'use strict';
	return {
		restrict: 'AECM',
		templateUrl: './directives/cardlist.html',
		replace: true,
		scope: {
			personObject: '=',
			formattedUsernameFunction: '&',
			formattedUseridFunction: '&',
			formattedUsertypeFunction: '&',
			formattedUserlevelFunction: '&',
			formattedAvatarurlFunction: '&',
			formattedGravataridFunction: '&',
			formattedFirstnameFunction: '&',
			formattedLastnameFunction: '&',
			formattedOnlinestatusFunction: '&',
			formattedOnlinelastFunction: '&',
			formattedHtmlurlFunction: '&',
			formattedEmailaddressFunction: '&',
			formattedBirthdateFunction: '&',
			formattedBiodetailsFunction: '&',
      getBiodetailsFunction: '&',
			getOnlinelastdetailsFunction: '&',
      upStarrankFunction: '&',
      downStarrankFunction: '&',
      formattedStarrankingFunction: '&',
      trashYourbudFunction: '&'
		},
		transclude: false,
		link: function (scope, elements, attrs) {
			//console.log('Linking...');
			//console.log(scope.personObject);
			// use this for online status visual
			/*
			if (scope.personObject.online_status === 'Available') {
				elements.addClass('list-group-item-success');
			} else if (scope.personObject.online_status === 'Busy') {
				elements.addClass('list-group-item-warning');
			} else if (scope.personObject.online_status === 'Idle') {
				elements.addClass('list-group-item-info');
			} else if (scope.personObject.online_status === 'Offline') {
				elements.addClass('list-group-item-danger');
			} else {
				elements.addClass('list-group-item-dafault');
			}
			
			scope.$on('update_online_status', function () {
				console.log('on update_online_status');
				if (scope.personObject.online_status === 'Available') {
					elements.addClass('list-group-item-success');
				} else if (scope.personObject.online_status === 'Busy') {
					elements.addClass('list-group-item-warning');
				} else if (scope.personObject.online_status === 'Idle') {
					elements.addClass('list-group-item-info');
				} else if (scope.personObject.online_status === 'Offline') {
					elements.addClass('list-group-item-danger');
				} else {
					elements.addClass('list-group-item-dafault');
				}
			});
			*/

		}
	};
});

myApp.directive('ariaCheck', function ($timeout) {
	'use strict';
	return {
		restrict: 'EA',
		link: function (scope, element, attrs) {
			element.bind('click', function () {
				//console.log(element.attr('class').includes('collapsed'));
				if (element.attr('class').includes('collapsed')) {
					element.addClass('glyphicon-chevron-up');
					element.removeClass('glyphicon-chevron-down');
				} else {
					element.addClass('glyphicon-chevron-down');
					element.removeClass('glyphicon-chevron-up');
				}
				//console.log(element.attr('aria-expanded'));
			});
      
      // reset glyphicon-chevron-down after trash buddy
			scope.$on('trash-reset', function () {
				$timeout(function () {
					element.addClass('glyphicon-chevron-down');
					element.removeClass('glyphicon-chevron-up');
        }, 500, false);
			});
          
		}
	};
});

myApp.directive('toggleClass', function () {
	'use strict';
	console.log('toggleClass clicked');
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('click', function () {
				if (element.attr('class').includes('glyphicon-plus')) {
					element.removeClass('glyphicon-plus');
					element.addClass('glyphicon-minus');
					element.addClass(attrs.toggleClass);
				} else {
					element.removeClass('glyphicon-minus');
					element.addClass('glyphicon-plus');
				}
			});
		}
	};
});

myApp.controller('homeController', ['$scope', '$log', 'nameService', function ($scope, $log, nameService) {
  'use strict';
  $scope.name = 'Code Challenge';
  $scope.subtitle = '';
	
}]);

myApp.controller('loginController', ['$scope', '$log', '$http', '$timeout', '$location', function ($scope, $log, $http, $timeout, $location) {
  'use strict';

	// function to initialize variables, this is used when the rest button is hit and after login success
	$scope.loginInit = function () {
		console.log('$scope.loginInit initializing');
		$scope.title = 'Sign up to get started...';
		$scope.subtitle = 'Login to get the good stuff.';
		$scope.email = '';
    $scope.password = '';
    $scope.verify = '';
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.birthdate = '';
    
		$scope.minemailcharacters = 2;
		$scope.maxemailcharacters = 56;
		$scope.minpasswordcharacters = 6;
		$scope.maxfirstnamecharacters = 50;
		$scope.maxlastnamecharacters = 50;
    
		$scope.emailtitle = 'Email';
		$scope.passwordtitle = 'Password';
		$scope.verifytitle = 'Verify';
		$scope.firstnametitle = 'First Name';
		$scope.lastnametitle = 'Last Name';
		$scope.birthdatetitle = 'Birthdate';
		$scope.minage = 14;
		$scope.maxage = 150;
		$scope.age = 0;
    window.scrollTo(0, 0);
    var em = document.getElementById('email');
    em.focus();
		return;
	};
	
	$scope.loginInit();
	

	// <-----  START bootstrap UI datepicker  ----->
	$scope.today = function () {
    $scope.birthdate = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.birthdate = null;
  };

  // Disable weekend selection
  $scope.disabled = function (date, mode) {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  };

  $scope.toggleMin = function () {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function ($event) {
		console.log('$scope.open clicked');
    $event.preventDefault();
    //$event.stopPropagation();
    $scope.opened = true;
  };

  $scope.dateOptions = {
    // for Bootstrap datepicker calendar popup formats
    formatYear: 'yyyy',
    formatDay: 'dd',
    formatMonth: 'MMM',
    startingDay: 1
  };

  $scope.formats = ['yyyy-MM-dd'];
  //$scope.format = $scope.formats[0];
  $scope.format = 'yyyy-MM-dd';
	
	// <-----  END bootstrap UI datepicker  ----->
	
	$scope.todaysDate = new Date();

	$scope.mmaxDate = function () {
		var j, d = new Date();
		j = d.setFullYear(d.getFullYear() - $scope.minage);
		console.log('$scope.mmaxDate : ' + $scope.minage + ' -> ' + j);
		return j;
	};

	$scope.mminDate = function () {
		var i, d = new Date();
		i = d.setFullYear(d.getFullYear() - $scope.maxage);
		console.log('$scope.mminDate : ' + $scope.maxage + ' -> ' + i);
		return i;
	};
  
	$scope.changeEmail = function () {
		console.log('changeEmail() : ' + $scope.user.email);
		if ($scope.user.email === undefined) {
      if ($scope.userForm.email.$error.pattern) {
        $scope.emailtitle = 'Email format is invalid';
      } else {
        $scope.emailtitle = 'Email is required';
      }
		} else {
			if ($scope.user.email.length === $scope.maxemailcharacters) {
				console.log(' reached ' + $scope.maxemailcharacters + ' characters maximum');
				$scope.emailtitle = 'Email character maximum reached ' + $scope.maxemailcharacters;
			} else if ($scope.user.email.length < 3) {
				$scope.emailtitle = 'A valid Email is required';
			} else {
				$scope.emailtitle = 'Email';
			}
			console.log('changeEmail() : (' + $scope.user.email.length + ') (' + $scope.maxemailcharacters + ') ' + $scope.user.email);
		}
		$scope.$broadcast('show-errors-check-validity');
	};
	
	$scope.changePassword = function () {
		console.log('changePassword() :' + $scope.user.password);
		if ($scope.user.password === undefined) {
			$scope.passwordtitle = 'Password is required';
      $scope.userForm.password.$setValidity('length', false);
		} else if ($scope.user.password.length < $scope.minpasswordcharacters) {
			$scope.passwordtitle = 'Password must be at least 6 characters';
      $scope.userForm.password.$setValidity('length', false);
		} else {
			$scope.passwordtitle = 'Password';
      $scope.userForm.password.$setValidity('length', true);
		}
    
		if ($scope.user.verify !== undefined) {
			if ($scope.user.verify.length > 0) {
				$scope.verifytitle = 'These don\'t look like they match';
        $scope.userForm.verify.$setValidity('length', false);
			}
			if ($scope.user.verify === $scope.user.password) {
				$scope.verifytitle = 'Match';
        $scope.userForm.verify.$setValidity('length', true);
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.changeVerify = function () {
		console.log('changeVerify() :' + $scope.user.verify);
		if ($scope.user.verify === undefined) {
			$scope.verifytitle = 'Verify is required';
      $scope.userForm.verify.$setValidity('length', false);
		} else if ($scope.user.verify !== $scope.user.password) {
			$scope.verifytitle = 'These don\'t look like they match';
      $scope.userForm.verify.$setValidity('length', false);
		} else if ($scope.user.verify === $scope.user.password) {
			$scope.verifytitle = 'Match';
      $scope.userForm.verify.$setValidity('length', true);
		} else {
			$scope.verifytitle = 'Verify';
      $scope.userForm.verify.$setValidity('length', true);
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.changeFirstName = function () {
		console.log('changeFirstName() :' + $scope.user.firstname);
		if ($scope.user.firstname === undefined) {
			$scope.firstnametitle = 'First Name require name characters only, letters and ` \' - only';
			console.log('changeFirstName(' + $scope.user.firstname + ') First Name requires letters only');
		} else {
			if ($scope.user.firstname.length === $scope.maxfirstnamecharacters) {
				$scope.firstnametitle = 'First Name no more than 50 characters.';
				console.log('changeFirstName(' + $scope.user.firstname.length + ') First Name no more than 50 characters');
			} else {
				$scope.firstnametitle = 'First Name';
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.changeLastName = function () {
		console.log('changeLastName() :' + $scope.user.lastname);
		if ($scope.user.lastname === undefined) {
			$scope.lastnametitle = 'Last Name is optional, require name characters only, letters and ` \' - only';
		} else {
			if ($scope.user.lastname.length === $scope.maxlastnamecharacters) {
				$scope.lastnametitle = 'Last Name no more than 50 characters';
				console.log('changeLastName() :' + $scope.user.lastname.length + ') Last Name no more than 50 characters');
			} else {
				$scope.lastnametitle = 'Last Name';
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.changeBirthdate = function () {
		console.log('changeBirthdate()');
		console.log('changeBirthdate() :' + $scope.user.birthdate);
		if ($scope.user.birthdate === undefined) {
			$scope.birthdatetitle = 'A valid Birthdate is required';
		} else {
			var x = document.getElementById('birthdate');
			console.log('x.value : ' + x.value);
      console.log('x.value.substr(0, 1) : ' + x.value.substr(0, 1));
			if (x.value.substr(0, 1) !== '0') {
				//console.log('x.value : ' + x.value);
				var d = new Date();
				$scope.age = ~~((d - new Date(x.value)) / (31557600000));
				console.log('$scope.age : ' + $scope.age);
				if ($scope.age < 14) {
					$scope.birthdatetitle = 'You must be minimum 14 years of age';
          $scope.userForm.birthdate.$setValidity('min', false);
				} else if ($scope.age > 150) {
					$scope.birthdatetitle = 'You can\'t be more than 150 years of age';
          $scope.userForm.birthdate.$setValidity('min', false);
				} else {
					$scope.age = 0;
					$scope.birthdatetitle = 'Birthdate';
          $scope.userForm.birthdate.$setValidity('min', true);
				}
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.loginReset = function () {
    console.log('$scope.loginReset clicked');
		$scope.user = { email: '', password: '', verify: '', firstname: '', lastname: '', birthdate: '' };
		$scope.userForm.$setPristine();
		$scope.$broadcast('show-errors-reset');
		$scope.loginInit();
	};

	$scope.Signup = function () {
    console.log('$scope.Signup clicked : ' + $scope.user.firstname);

    /*
		if ($scope) {
      console.log('$scope.userForm : ' + $scope);
      //return;
			var hosttarget = './dbsource/people_add.php';
			$http.post(hosttarget, { userForm: $scope.user })
				.success(function (result) {
					if (result) {
						$scope.people = $scope.peopleTmp = result;
						//$scope.newPerson = '';
						$scope.loginReset();
            $location.path('/contacts');
					}
				})
				.error(function (data, status) {
					console.log(data);
				});
		}
    */
    
    window.alert('Welcome to the Code Challenge family, ' + $scope.user.firstname + '!');
		$timeout(function () {
		  $scope.loginReset();
		}, 1000);
    
	};

}]);

myApp.controller('contactsController', ['$scope', '$log', '$http', '$localStorage', '$timeout', 'nameService', 'orderByFilter', function ($scope, $log, $http, $localStorage, $timeout, nameService, orderBy) {
  'use strict';
  $scope.title = 'The Buddy List';
	$scope.name = 'Buddies come to life...';
	$scope.isOpen = true;
  $scope.default_avatar_url = './dist/img/default_avatar.jpg';
  
  // function to initialize variables, this is used when the clear button is hit and after add success
  $scope.addPersonInit = function () {
		console.log('$scope.addPersonInit initializing');
		$scope.email_address = '';
    $scope.user_name = '';
    $scope.first_name = '';
    $scope.last_name = '';
    $scope.birth_date = '';

    /*
    $scope.email_address.setPristine;
    $scope.user_name.setPristine;
    $scope.first_name.setPristine;
    $scope.last_name.setPristine;
    $scope.birth_date.setPristine;
    */
    
		$scope.minemailcharacters = 3;
		$scope.maxemailcharacters = 56;
		$scope.minpasswordcharacters = 6;
		$scope.maxfirstnamecharacters = 50;
		$scope.maxlastnamecharacters = 50;
    
		$scope.email_addresstitle = 'Email';
		$scope.first_nametitle = 'First Name';
		$scope.last_nametitle = 'Last Name';
    $scope.user_nametitle = 'Handle';
		$scope.birth_datetitle = 'Birthdate';
		$scope.minage = 14;
		$scope.maxage = 150;
		$scope.age = 0;
    window.scrollTo(0, 0);
		return;
	};
	
	$scope.addPersonInit();
  
  $scope.getBuddy = function () {
    // get Buddy using angular $http via PHP
    $http.get('./dbsource/people_get.php')
    //$http.get('/dbsource/person.json')
      .success(function (response) {
        
        $scope.people = $scope.peopleTmp = response;
        var people = $scope.people;
        $scope.propertyName = $scope.formattedName;
        $scope.people = orderBy(people, $scope.propertyName, false);
        $localStorage.setObject('people', $scope.people);
        
        //$scope.reverse = $scope.isABReverse = ($scope.reverse) ? false : true;
        //console.log('$scope.reverse:' + $scope.reverse);
        //$scope.people = orderBy(people, $scope.propertyName, $scope.reverse);
      })
      .error(function (data, status) {
        console.log(data);
      });
  };
  
  var gCD = '';
  gCD = $localStorage.getObject('people');
  if (gCD !== undefined) {
    console.log('$localStorage.getObject : ' + gCD.length);
    $scope.people = $scope.peopleTmp = gCD;
  } else {
    console.log('$scope.getPeople : ' + $scope.getPeople);
    $scope.getPeople = 1;
    $scope.getBuddy();
  }
  
  // post new Buddy using angular $http
  $scope.newPerson = '';
  $scope.addPerson = function () {
		console.log('$scope.addPerson clicked : ' + $scope.newPerson.user_name);
		if ($scope.newPerson) {
      console.log('$scope.newPerson : ' + $scope.newPerson.first_name);
      //return;
			var hosttarget = './dbsource/people_add.php';
			$http.post(hosttarget, { newPerson: $scope.newPerson })
				.success(function (result) {
					if (result) {
						//$scope.people = $scope.peopleTmp = result;
            $scope.people.push($scope.newPerson);
            $localStorage.setObject('people', $scope.people);
						//$scope.newPerson = '';
						$scope.addPersonReset();
					}
				})
				.error(function (data, status) {
					console.log(data);
				});
		}
  };

  // post update using angular $http
  $scope.updBuddy = '';
  $scope.updateBuddy = function () {
		if (this.rule.BuddyName) {
			console.log('update this.person.name: #' + this.person.user_id + ' | ' + this.person.first_name);
			var hosttarget;
			$scope.updBuddy = {
				ruleId: this.person.userid,
				upRule: this.person.name
			};
			hosttarget = './dbsource/people_upd.php';
			$http.post(hosttarget, $scope.updRule)
				.success(function (result) {
					$scope.updateBuddy = result;
					$scope.updBuddy = '';
				})
				.error(function (data, status) {
					console.log(data);
				});
		}
  };
	
	// post delete using angular $http
  $scope.delBuddy = '';
  $scope.trashYourbud = function (person) {
		console.log('$scope.trashYourbud clicked : User_id: ' + person.user_id + ' -> ' + person.first_name);
    //return;
    var hosttarget = './dbsource/people_del.php';
    $http.post(hosttarget, { delBuddy: person.user_id })
      .success(function (result) {

        // now that the person is removed from the DB we can remove record object from the local storage JSON array
        $scope.people.forEach(function (result, index) {
          console.log(result.user_id + ' === ' + person.user_id);
          if (result.user_id === person.user_id) {
            //Remove from array
            $scope.people.splice(index, 1);
          }
        });

        // set the local storage JSON array to the updated $scope.people JSON array
        $localStorage.setObject('people', $scope.people);
        person.user_id = '';
        
        // reset the upchevron to the down position
        $scope.$broadcast('trash-reset');
      })
      .error(function (data, status) {
        console.log(data);
      });
  };
	
	$scope.formattedUsername = function (person) {
		return person.user_name;
	};
	
	$scope.formattedUserid = function (person) {
		return person.user_id;
	};
	
	$scope.formattedUsertype = function (person) {
		return person.user_type;
	};
	
	$scope.formattedUserlevel = function (person) {
		return person.user_level;
	};
				
	$scope.formattedAvatarurl = function (person) {
    if (person.avatar_url) {
      return person.avatar_url;
    } else {
      return $scope.default_avatar_url;
    }
	};
		
	$scope.formattedGravatarid = function (person) {
		return person.gravatar_id;
	};
		
	$scope.formattedFirstname = function (person) {
		return person.first_name;
	};
	
	$scope.formattedLastname = function (person) {
		return person.last_name;
	};
	
	$scope.formattedOnlinestatus = function (person) {
    if (person.online_status) {
      return person.online_status;
    } else {
      return 'Available';
    }
	};
	
	$scope.formattedOnlinelast = function (person) {
		return person.online_last;
	};
	
	$scope.formattedHtmlurl = function (person) {
		return person.html_url;
	};
		
	$scope.formattedEmailaddress = function (person) {
		return person.email_address;
	};
	
	$scope.formattedBirthdate = function (person) {
		return person.birth_date;
	};

	$scope.formattedBiodetails = function (person) {
		return person.bio_details;
	};
	
	$scope.getBiodetails = function (person) {
		return person.bio_details;
	};

	$scope.formattedName = function (person) {
		return person.first_name + ' ' + person.last_name;
	};
	
	$scope.formattedAddress = function (person) {
		return person.mailing_address + ', ' + person.mailing_state + ', ' + person.mailing_zip + ' ' + person.mailing_country;
	};
	
	$scope.getDetails = function (person) {
		return 'mailto:' + person.email_address;
	};
	
	$scope.getStarranking = function (person) {
		return person.star_rank;
	};
	
	$scope.getOnlinelastdetails = function (person) {
		if (person.online_status === 'Offline' || person.online_status === 'Unknown') {
      return false;
    } else {
      return true;
    }
	};
	
	$scope.formattedStarranking = function (person) {
    if (this.person.star_rank === undefined) {
      this.person.star_rank = 3;
      console.log('$scope.formattedStarranking returned : ' + this.person.user_id + ' | ' + this.person.first_name + ' | ' + this.person.star_rank);
    }
    // todo save this user star rank
    return this.person.star_rank;
	};
    
  $scope.downStarrank = function (person) {
		// Rank the Stars for buddies
    if (person.star_rank > 0) {
      person.star_rank -= 1;
      console.log('$scope.downStarrank clicked: ' + this.person.user_id + ' | ' + this.person.first_name + ' | ' + this.person.star_rank);
      $localStorage.setObject('people', $scope.people);
      return (person.star_rank);
    }
	};
  
  $scope.upStarrank = function (person) {
		// Rank the Stars for buddies
    if (person.star_rank < 5) {
      person.star_rank += 1;
      console.log('$scope.upStarrank clicked: ' + this.person.user_id + ' | ' + this.person.first_name + ' | ' + this.person.star_rank);
      $localStorage.setObject('people', $scope.people);
      console.log('$localStorage.getObject: ' + $localStorage.getObject('people').length);
      $scope.people = $localStorage.getObject('people');
      return (person.star_rank);
    }
	};

	$scope.expandDetails = function () {
		console.log('$scope.expandDetails clicked');
	};
  
  //onfocus function
  $scope.appFocussearch = function () {
    var sd = document.getElementById('searchDialog');
    console.log('sd.getAttribute(aria-expanded) : ' + sd.getAttribute('aria-expanded'));
    var as = document.getElementById('appsearch');
    //console.log('$scope.appsearch.focus : ' + as.focus);
    if (sd.getAttribute('aria-expanded')) {
      $timeout(function () {
        as.focus();
      }, 500, false);
    } else {
      $timeout(function () {
        as.focus();
      }, 500, false);
    }
  };
  
  //onfocus function
  $scope.appFocusadd = function () {
    var ad = document.getElementById('addDialog');
    console.log('ad.getAttribute(aria-expanded) : ' + ad.getAttribute('aria-expanded'));
    var aa = document.getElementById('first_name');
    if (ad.getAttribute('aria-expanded')) {
      $timeout(function () {
        aa.focus(false);
      }, 500, false);
    } else {
      $timeout(function () {
        aa.focus(true);
      }, 500, false);
    }
  };
  
	// search function
  $scope.searchBuddy = '';
  $scope.searchBuddies = function () {
    console.log('searchField peopleTmp length: ' + $scope.peopleTmp.length);
    $scope.people = $scope.peopleTmp;
    var searchResult = [], searchField = 'first_name' + ' ' + 'last_name', searchVal = this.person.search.toLowerCase(), i;
    console.log('searchBuddies for: ' + this.person.search);
    if (this.person.search) {
      for (i = 0; i < $scope.people.length; i += 1) {
        console.log(($scope.people[i].first_name.toLowerCase() + ' ' + $scope.people[i].last_name.toLowerCase()).indexOf(searchVal));
        if (($scope.people[i].first_name.toLowerCase() + ' ' + $scope.people[i].last_name.toLowerCase()).indexOf(searchVal) > -1) {
          console.log('searchField found: ' + $scope.people[i].first_name + ' ' + $scope.people[i].last_name);
          searchResult.push($scope.people[i]);
        }
      }
      console.log('searchField afterPush: ' + searchResult.length);
      $scope.people = searchResult;
    } else {
      $scope.people = $scope.peopleTmp;
    }
  };
	
	$scope.clearSearch = function () {
		console.log('$scope.clearSearch clicked');
		$scope.person = { search: '' };
    $scope.people = $scope.peopleTmp;
    window.scrollTo(0, 0);
    $scope.appFocussearch();
	};
  
	$scope.sortBuddies = function () {
		console.log('$scope.sortBuddies clicked');
    var people = $scope.people;
    $scope.propertyName = $scope.getStarranking;
    $scope.reverse = $scope.isReverse = ($scope.reverse) ? false : true;
    console.log('$scope.reverse:' + $scope.reverse);
    $scope.people = orderBy(people, $scope.propertyName, $scope.reverse);
	};
  
	$scope.sortBuddiesAB = function () {
		console.log('$scope.sortBuddiesAB clicked');
    var people = $scope.people;
    $scope.propertyName = $scope.formattedName;
    $scope.reverse = $scope.isABReverse = ($scope.reverse) ? false : true;
    console.log('$scope.reverse:' + $scope.reverse);
    $scope.people = orderBy(people, $scope.propertyName, $scope.reverse);
	};
	
	$scope.addPersonReset = function () {
		// takes the addDialog Clear button action to empty form
		console.log('$scope.addPersonReset clicked');
		$scope.$broadcast('show-errors-reset');
		$scope.newPerson = { first_name: '', last_name: '', user_id: '', email_address: '',  birth_date: ''  };
		//$scope.newPerson.$setPristine();
    $scope.addPersonInit();
    $scope.appFocusadd();
	};

	$scope.changeFirstName = function () {
		console.log('changeFirstName() :' + $scope.newPerson.first_name);
		if ($scope.newPerson.first_name === undefined) {
			$scope.first_nametitle = 'First Name requires name characters only, letters and ` - \' - only';
		} else {
			if ($scope.newPerson.first_name.length === $scope.maxfirstnamecharacters) {
				$scope.first_nametitle = 'First Name no more than 50 characters.';
				console.log('changeFirstName(' + $scope.newPerson.first_name.length + ') First Name no more than 50 characters');
			} else {
				$scope.first_nametitle = 'First Name';
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.changeLastName = function () {
		console.log('changeLastName() :' + $scope.newPerson.last_name);
		if ($scope.newPerson.last_name === undefined) {
			$scope.last_nametitle = 'Last Name is optional, name characters only, letters and ` - \' - only';
		} else {
			if ($scope.newPerson.last_name.length === $scope.maxlastnamecharacters) {
				$scope.last_nametitle = 'Last Name no more than 50 characters';
				console.log('changeLastName() :' + $scope.newPerson.last_name.length + ') Last Name no more than 50 characters');
			} else {
				$scope.last_nametitle = 'Last Name';
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.changeHandle = function () {
		console.log('changeHandle() :' + $scope.newPerson.user_name);
		if ($scope.newPerson.user_name === undefined) {
			$scope.user_nametitle = 'Handle is required, alpha characters & numbers only';
		} else {
			if ($scope.newPerson.user_name.length === $scope.maxusernamecharacters) {
				$scope.user_nametitle = 'Last Name no more than 50 characters';
				console.log('changeHandle() :' + $scope.newPerson.user_name.length + ') Handle no more than 50 characters');
			} else {
				$scope.user_nametitle = 'Handle';
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.changeEmail = function () {
		console.log('changeEmail() : ' + $scope.newPerson.email_address);
		if ($scope.newPerson.email_address === undefined) {
			$scope.email_addresstitle = 'Email format is invalid';
		} else {
			if ($scope.newPerson.email_address.length === $scope.maxemailcharacters) {
				console.log(' reached ' + $scope.maxemailcharacters + ' characters maximum');
				$scope.emailtitle = 'Email character maximum reached ' + $scope.maxemailcharacters;
			} else if ($scope.newPerson.email_address.length < 3) {
				$scope.email_addresstitle = 'A valid Email is a required';
			} else {
				$scope.email_addresstitle = 'Email';
			}
			console.log('changeEmail() : (' + $scope.newPerson.email_address.length + ') (' + $scope.maxemailcharacters + ') ' + $scope.newPerson.email_address);
		}
    $scope.$broadcast('show-errors-check-validity');
	};
	
	$scope.changeBirthdate = function () {
		console.log('changeBirthdate()');
		console.log('changeBirthdate() :' + $scope.newPerson.birth_date);
		if ($scope.newPerson.birth_date === undefined) {
			$scope.birth_datetitle = 'A valid Birthdate is required';
		} else {
			var x = document.getElementById('birth_date');
      console.log('x.value.substr(0, 1) : ' + x.value.substr(0, 1));
			if (x.value.substr(0, 1) !== '0') {
				//console.log('x.value : ' + x.value);
				var d = new Date();
				$scope.age = ~~((d - new Date(x.value)) / (31557600000));
				console.log('$scope.age : ' + $scope.age);
				if ($scope.age < 14) {
					$scope.birth_datetitle = 'You must be minimum 14 years of age';
          $scope.newPersonForm.birth_date.$setValidity('min', false);
				} else if ($scope.age > 150) {
					$scope.birth_datetitle = 'You can\'t be more than 150 years of age';
          $scope.newPersonForm.birth_date.$setValidity('min', false);
				} else {
					$scope.age = 0;
					$scope.birth_datetitle = 'Birthdate';
          $scope.newPersonForm.birth_date.$setValidity('min', true);
				}
			}
		}
    $scope.$broadcast('show-errors-check-validity');
	};

	$scope.today = function () {
    $scope.birthdate = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.birthdate = null;
  };

  // Disable weekend selection
  $scope.disabled = function (date, mode) {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  };

  $scope.toggleMin = function () {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function ($event) {
		console.log('$scope.open clicked');
    $event.preventDefault();
    //$event.stopPropagation();
    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['yyyy-MM-dd'];
  $scope.format = $scope.formats[0];
	
	// <-----  END bootstrap UI datepicker  ----->
	
	$scope.todaysDate = new Date();

	$scope.mmaxDate = function () {
		var j, d = new Date();
		j = d.setFullYear(d.getFullYear() - $scope.minage);
		console.log('$scope.mmaxDate : ' + $scope.minage + ' -> ' + j);
		return j;
	};

	$scope.mminDate = function () {
		var i, d = new Date();
		i = d.setFullYear(d.getFullYear() - $scope.maxage);
		console.log('$scope.mminDate : ' + $scope.maxage + ' -> ' + i);
		return i;
	};
  
}]);

myApp.controller('mainController', ['$scope', '$filter', '$log', '$timeout', '$http', function ($scope, $filter, $log, $timeout, $http) {
  'use strict';
	
  $scope.name = 'Welcome, this is the Main page';

  $timeout(function () {

    $scope.name = 'We hope your experience is a great one!';

  }, 3000);

  $scope.twitterhandle = '';

  $scope.lowercasettwitterhandle = function () {

    return $filter('lowercase')($scope.twitterhandle);

  };
  
  // get rules via JSON using angular $http built-in directive for comm
  //$scope.getRules = function () {
	console.log('getrules $scope.getRules');
	var hosttarget = './dbsource/r.php';
	// insert header for - 'Access-Control-Allow-Origin'
	$http.get(hosttarget)
		.success(function (result) {
			$scope.rules = result;
		})
		.error(function (data, status) {
			console.log(data);
		});
	//};
	
  // post new rule using angular $http built-in directive for comm
  $scope.newRule = '';
  $scope.addRule = function () {
		if ($scope.newRule) {
			console.log('create $scope.newRule: ' + $scope.newRule);
			var hosttarget = './dbsource/c.php';
			$http.post(hosttarget, { newRule: $scope.newRule })
				.success(function (result) {
					$scope.rules = result;
					$scope.newRule = '';
					//$scope.$apply();
				})
				.error(function (data, status) {
					console.log(data);
				});
		}
  };

  // post update rule using angular $http built-in directive for comm
  $scope.updRule = '';
  $scope.updateRule = function () {
		if (this.rule.RuleName) {
			console.log('update this.rule.Rule: #' + this.rule.ID + ' | ' + this.rule.RuleName);
			var hosttarget;
			$scope.updRule = {
				ruleId: this.rule.ID,
				upRule: this.rule.RuleName
			};
			hosttarget = './dbsource/u.php';
			$http.post(hosttarget, $scope.updRule)
				.success(function (result) {
					$scope.rules = result;
					$scope.updRule = '';
				})
				.error(function (data, status) {
					console.log(data);
				});
		}
  };
	
	// post del rule using angular $http built-in directive for comm
  $scope.ruleName = '';
  $scope.delRule = function () {
		console.log('delete this.rule.RuleName: ' + this.rule.RuleName);
    var hosttarget = './dbsource/d.php';
    $http.post(hosttarget, { ruleName: this.rule.RuleName })
      .success(function (result) {
        $scope.rules = result;
        $scope.ruleName = '';
      })
      .error(function (data, status) {
        console.log(data);
      });
  };
  
	// abort del rule
  $scope.ruleName = '';
  $scope.abortRule = function () {
		console.log('abortRule');
		
	};
  
	// edit rule
  $scope.ruleName = '';
	$scope.curRule = '';
  $scope.editRule = function () {
		$scope.curRule = this.rule.RuleName;
		console.log('editRule : ' + $scope.curRule);
		console.log('rule.ID : ' + this.rule.ID);
		//console.log($scope.getElementById('btnOk').display);
		
	};
  
	// change rule
  $scope.ruleName = '';
  $scope.changeRule = function () {
		console.log('changeRule');
		
	};
	
}]);