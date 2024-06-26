package com.hccs.project.FINAL;

import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping // Map POST Requests to /api/users
    public ResponseEntity<String> addUser(@RequestBody User user) {
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User added successfully");
    }
 
    @GetMapping // Map GET Requests to /api/users
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
    @DeleteMapping("/{id}") // Map DELETE Requests to /api/users/{id}
    public ResponseEntity<String> deleteUser(@PathVariable("id") Integer id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}






