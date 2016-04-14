'use strict';

app.factory('addressFactory', function(){
    var addressFactory = {};
    addressFactory.addressBook = [];

    addressFactory.saveAddress = function(index, name, address, town, country){
        messages.addressBook.push({
            id: index,
            name: name, 
            address: address, 
            town: town, 
            country: country
        });
        localStorage.setItem('addressBook', JSON.stringify(messages.addressBook));
        $location.path('address-book');
    };

    addressFactory.deleteAddress = function(index) {
        messages.addressBook.splice(index, 1); 
        localStorage.setItem('addressBook', JSON.stringify(messages.addressBook)); 
    }

    addressFactory.init = function() {
        addressFactory.savedAddresses =  localStorage.getItem("addressBook");
        addressFactory.addressBook = (localStorage.getItem('addressBook')!==null) ? JSON.parse(this.savedAddresses) : [ {id: 1, name: 'Paul Fitzgerald', address: "22 Sancroft Street", town: "London", country: "United Kingdom"}];
        localStorage.setItem('addressBook', JSON.stringify(addressFactory.addressBook));
    }

    return addressFactory;
})

app.controller('touchnoteCtrl', ['$routeParams', '$location','$uibModal', 'addressFactory', function ($routeParams, $location, $uibModal, addressFactory) {

    var touchnoteCtrl = this;

    this.countries = [
        {name: "United Kingdom"},
        {name: "Ireland"},
        {name: "United States of America"}
    ];

    

    //initialization function. If address book 
    //doesn't exist create it and add a contact
    this.init = function() {
        console.log(addressFactory)
        addressFactory.init();
        this.addressBook = addressFactory.addressBook;
        //retrieve all saved addresses from address book
        // touchnoteCtrl.savedAddresses = localStorage.getItem("addressBook");
        //create a  new contact 
        // touchnoteCtrl.addressBook = (localStorage.getItem('addressBook')!==null) ? JSON.parse(this.savedAddresses) : [ {id: 1, name: 'Paul Fitzgerald', address: "22 Sancroft Street", town: "London", country: "United Kingdom"}];
        //add item to local storage if none have been created yet
        // localStorage.setItem('addressBook', JSON.stringify(touchnoteCtrl.addressBook));
    }

    // this.saveAddress = addressFactory.saveAddress(index, name, address, town, country)

    //add address to Address Book and Local Storage
    // this.saveAddress = function(index, name, address, town, country) {
    //     this.addressBook.push({
    //         id: index,
    //         name: name, 
    //         address: address, 
    //         town: town, 
    //         country: country
    //     })

    //     localStorage.setItem('addressBook', JSON.stringify(this.addressBook));
    //     $location.path('address-book');
    // }

    // this.deleteAddress = function(index) {
    //     this.addressBook.splice(index, 1); 
    //     localStorage.setItem('addressBook', JSON.stringify(this.addressBook));    
    // }


    this.open = function () {
        touchnoteCtrl.modalInstance = $uibModal.open({
          templateUrl: 'app/views/partials/form.html',
          controller: 'ModalCtrl',
          controllerAs:'modal',
        });
    }

    this.init();

}])

.controller('ModalCtrl', ['$uibModalInstance', function ( $uibModalInstance) {

    this.cancelAddress = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
