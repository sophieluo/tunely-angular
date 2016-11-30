/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);

AlbumsIndexController.$inject = ['$http'];

function AlbumsIndexController ($http) {
  var vm = this;
  vm.newAlbum = {};
  vm.newAlbum = {
    name: 'Viva Hate',
    artistName: 'Morrissey'
  };

  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(function successCallback(response) {
    vm.albums = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createAlbum = function () {
    $http({
      method: 'POST',
      url: '/api/albums',
      data: vm.newAlbum,
    }).then(function successCallback(response) {
      vm.albums.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  } //end of create

  vm.deleteAlbum = function (album) {
  $http({
    method: 'DELETE',
    url: '/api/albums/'+ album._id
  }).then(function successCallback(deletedAlbum) {
    console.log(deletedAlbum.data);
    console.log(album);
    var index = vm.albums.indexOf(album);
    vm.albums.splice(index, 1);
    // location.reload();
  }, function errorCallback(response) {
    console.log('There was an error deleting the data', response);
  });
} //end of delete

vm.editAlbum = function (album) {
  $http({
    method: 'PUT',
    url: '/api/albums/' + album._id,
    data: {
      name: album.name,
      artistName: album.artistName
    },
  }).then(function successCallback(updatedAlbumJson) {
    var index = vm.albums.indexOf(updatedAlbumJson);
    vm.albums.splice(index, 1, album);
    console.log(updatedAlbumJson);
    location.reload();
    // any hiding / showing that needs to occur
  }, function errorCallback(response) {
    console.log('There was an error deleting the data', response);
  });
}

}
