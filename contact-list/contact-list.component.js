// Register contactList component with its `ContactListController` controller and template on the `contactsApp` module
angular
.module('contactList')
.component('contactList', {
    templateUrl: 'contact-list/contact-list.template.html',
		controller: ['Contact',
			function ContactListController(Contact) {
				var self = this;				
				self.contacts = Contact.getList();
			}
		]
  });