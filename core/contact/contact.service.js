angular.
  module('core.contact').
  factory('Contact', [ '$resource', '$rootScope', '$localStorage', 
    function( $resource, $rootScope, $localStorage ) {      
      
      if ( !$rootScope.$storage ) {
        $rootScope.$storage = $localStorage;
      }    
      
      if (!($rootScope.$storage.contactsList instanceof Array)) { //populate storage with seed
        $rootScope.$storage.contactsList =  $resource('contacts-data/contacts.json', {}, {
          query: {
            method: 'GET',
            isArray: true
          }
        }).query();      
      }

      var _contactIds = []; //array to hold the unique ids
      if (_contactIds instanceof Array) { //unique ids array
        $rootScope.$storage.contactsList.forEach( function(v) {
          _contactIds.push(v.id);
        });
      }

      function generateId() {        
        var nextId = Math.max.apply(null,_contactIds);          
        return ++nextId;
      };

      return {
        getList: function () {
          return $rootScope.$storage.contactsList;
        },
        getById: function(id) {
          var contact = $rootScope.$storage.contactsList.find(function(v) {
              return v.id == id;
            });
          if (contact)
            return JSON.parse(JSON.stringify(contact));
          else
            throw "Contact not found.";
        },
        save:  function(id, contact) {
          var updatedContact = JSON.parse(JSON.stringify(contact));
          var index = $rootScope.$storage.contactsList.findIndex(
            function(v) {
              return v.id == id;
            });
            $rootScope.$storage.contactsList[index] = updatedContact;
        },
        add:  function(contact) {                     
          contact.id = generateId();
          console.log("Id:"+contact.id+",n-"+contact.name+",e-"+contact.email+",p-"+contact.phone+",a-"+contact.avatar);
          $rootScope.$storage.contactsList.push(contact);
          _contactIds.push(contact.id);
        }        

      };
    }
 ]);

