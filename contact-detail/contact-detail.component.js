angular.
  module('contactDetail').
  component('contactDetail', {
    templateUrl: 'contact-detail/contact-detail.template.html',
    controller: ['$routeParams','$location','Contact',
      function ContactDetailController($routeParams,$location, Contact) {
        var self = this;        
        self.errMsg = "";
        
        if ($location.path().includes('add')) { 
          self.contactDetail = new Object();
          self.viewMode = false; 
          self.isNew = true;           
        } else { //get contact detail
          try {
            self.contactDetail = Contact.getById($routeParams.contactId);
            if (self.contactDetail.birthday)
              self.contactDetail.birthday = new Date(self.contactDetail.birthday);                    
          } 
          catch (e) { 
            self.errMsg = "Contact not found."
          }
          if ($location.path().includes('edit')) {
            self.viewMode = false;
            self.isNew = false;
          } else {
            self.viewMode = true;
            self.isNew = false;
          }
        }        
        
        self.saveContact = function saveContact() {   //save contact
          // console.log("Save Controller: N-"+self.contactDetail.name+",E-"+self.contactDetail.email+",P-"+self.contactDetail.phone+",A-"+self.contactDetail.avatar+",b-"+self.contactDetail.birthday);
          Contact.save(self.contactDetail.id, self.contactDetail);
          $location.path("/contacts/details/"+self.contactDetail.id);
        };       

        
        self.addContact = function addContact() {  //add contact
          // console.log("Add Controller: N-"+self.contactDetail.name+",E-"+self.contactDetail.email+",P-"+self.contactDetail.phone+",A-"+self.contactDetail.avatar);
          Contact.add(self.contactDetail);
          $location.path("/contacts/details/"+self.contactDetail.id);
        };     

      } //end function    
    ]
  });