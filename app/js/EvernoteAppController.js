'use strict';

app.controller('touchnoteCtrl', ['$routeParams','$uibModal', 'addressFactory', function ($routeParams, $uibModal, addressFactory) {

    var touchnoteCtrl = this;
    this.addressBook = addressFactory.addressBook;

    this.init = function() {
        addressFactory.init();
        this.addressBook = addressFactory.addressBook;
    }

    this.deleteAddress = function(index){
        addressFactory.deleteAddress(index);
    };

    this.open = function () {
        touchnoteCtrl.modalInstance = $uibModal.open({
            templateUrl: 'app/views/partials/add-address.html',
            controller: 'ModalCtrl',
            controllerAs:'ctrl',
            resolve: {
                //this is used to prevent angular throwing an error
                editIndex: function () {
                    return undefined;
                }
           }
        });
    }

    this.openEdit = function(index) {
        touchnoteCtrl.modalInstance = $uibModal.open({
            templateUrl: 'app/views/partials/edit-address.html',
            controller: 'ModalCtrl',
            controllerAs:'ctrl',
            resolve: {
                //this is used to access the index in the modalCtrl
                editIndex: function () {
                    return index;
                }
           }
        });
    }

    this.init();

}])

.controller('ModalCtrl', ['$uibModalInstance','addressFactory','editIndex', function ($uibModalInstance,addressFactory, editIndex) {

    this.addressBook = addressFactory.addressBook;
    this.countries = addressFactory.countries;

    this.saveAddress = function( name, address, town) {
        addressFactory.saveAddress( name, address, town);
        $uibModalInstance.dismiss('cancel');
    }

    this.getIndex = editIndex;

    this.updateAddress = function(name, address, town, index) {
        addressFactory.updateAddress( name, address, town, index);
        $uibModalInstance.dismiss('cancel');
    }

    this.cancelAddress = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
