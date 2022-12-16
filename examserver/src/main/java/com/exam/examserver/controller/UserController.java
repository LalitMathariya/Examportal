package com.exam.examserver.controller;

import com.exam.examserver.helper.UserFoundException;
import com.exam.examserver.helper.UserNotFoundException;
import com.exam.examserver.model.Role;
import com.exam.examserver.model.User;
import com.exam.examserver.model.UserRole;
import com.exam.examserver.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //creating user
    @PostMapping("/")
    public User CreateUser(@RequestBody User user) throws Exception {

        user.setProfile("default.png");
        //encoding password with bcrypt password encoder
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));


        Set<UserRole> roles = new HashSet<>();

        Role role = new Role();
        role.setRoleId(45L);
        role.setRolename("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);
        return this.userService.CreateUser(user,roles);
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username")String username)
    {
        return  this.userService.getUser(username);
    }

    @DeleteMapping("/{userId}")
    //delete the userby id
    public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deleteUser(userId);

    }

    @ExceptionHandler(UserFoundException.class)
    public ResponseEntity<?> exceptionHandler(UserFoundException ex) {
        return ResponseEntity.ok(ex.getMessage());
    }


}
