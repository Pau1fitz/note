'use strict';
app.factory('addressFactory', function(){
    var addressFactory = {};
    addressFactory.addressBook = [];

    addressFactory.saveAddress = function(name, address, town){
        addressFactory.addressBook.push({
            name: name, 
            address: address, 
            town: town
        });
        localStorage.setItem('addressBook', JSON.stringify(addressFactory.addressBook));
    };

    addressFactory.updateAddress = function(name, address, town, index){
        addressFactory.addressBook[index] = {
            name: name, 
            address: address,
            town: town
        };
        localStorage.setItem('addressBook', JSON.stringify(addressFactory.addressBook));
    };

    addressFactory.deleteAddress = function(index) {
        addressFactory.addressBook.splice(index, 1); 
        localStorage.setItem('addressBook', JSON.stringify(addressFactory.addressBook)); 
    }

    //initialization function. If address book 
    //doesn't exist create it and add a contact
    addressFactory.init = function() {
        addressFactory.savedAddresses =  localStorage.getItem("addressBook");
        addressFactory.addressBook = (localStorage.getItem('addressBook')!==null) ? JSON.parse(this.savedAddresses) : [ {name: 'Paul Fitzgerald', address: "22 Sancroft Street", town: "London"}];
        localStorage.setItem('addressBook', JSON.stringify(addressFactory.addressBook));
    }

    return addressFactory;
})