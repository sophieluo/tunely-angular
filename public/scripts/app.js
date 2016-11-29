/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */
angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);


AlbumsIndexController.$inject = ['$http'];
function AlbumsIndexController ( $http ) {
  var vm = this;
  vm.newAlbum = {};

  vm.albums = [];

$http({
  method: 'GET',
  url: '/api/albums'
}).then(function successCallback(response) {
  console.log('response for all albums:', response);
  // vm.getResponse = response;
  vm.albums = response.data
  console.log(vm.albums)
  // probably do something with the response data
}, function errorCallback(error) {
  console.log('There was an error getting the data', error);
});

vm.createAlbum = function(){
  console.log('creating album!');
  // make the http request with the data you have from two-way binding
  $http({
  method: 'POST',
  url: '/api/albums',
  data: vm.newAlbum,
}).then(function successCallback(response) {
  console.log('response for create album:', response.data);
  vm.albums.push(vm.newAlbum)
  location.reload();
}, function errorCallback(error) {
  console.log('There was an error getting the data', error);
});
} //end of createAlbum

}
