angular.
  module('contactsApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/contacts', {
          template: '<contact-list></contact-list>'
        }).
        when('/contacts/details/:contactId', {
          template: '<contact-detail></contact-detail>'
        }).
        when('/contacts/details/edit/:contactId', {
          template: '<contact-detail></contact-detail>'
        }).
        when('/contacts/details/add', {
          template: '<contact-detail></contact-detail>'
        }).
        otherwise('/contacts');        
    }
  ]);