(function ($) {
    "use strict";

    angular.module('contactApp', [])
        .controller('contactController', function ($scope, $http) {
            $scope.contact = {};
            $scope.submitted = false;
            $scope.submittedData = {}; // Initialize submittedData object

            // Function to fetch users
            function fetchUsers() {
                $http({
                    method: "GET",
                    url: "http://localhost:8090/api/users"
                }).then(function mySuccess(response) {
                    $scope.users = response.data;
                    console.log("Retrieved users:", $scope.users);
                }).catch(function myError(error) {
                    console.error("Error retrieving users:", error);
                });
            }

            // Initial fetch of users
            fetchUsers();

            // Function to submit form
            $scope.submitForm = function () {
                $http.post('http://localhost:8090/api/users', $scope.contact)
                    .then(function (response) {
                        console.log("Form submitted:", response.data);
                        $scope.submitted = true;
                        $scope.submittedData = response.data; // Assign response data to submittedData
                        $scope.contact = {}; // Clear the form
                        // Fetch users again after successful form submission
                        fetchUsers();
                    })
                    .catch(function (error) {
                        console.error("Error submitting form:", error);
                    });
            };
        });

})(jQuery);



