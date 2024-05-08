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

            // Function to delete a user
            $scope.deleteUser = function (userId) {
                $http.delete('http://localhost:8090/api/users/' + userId)
                    .then(function (response) {
                        console.log("User deleted:", response.data);
                        // Fetch users again after successful deletion
                        fetchUsers();
                    })
                    .catch(function (error) {
                        console.error("Error deleting user:", error);
                    });
            };
        });

})(jQuery);


    // Initiate the wowjs
    new WOW().init();


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    



