package com.rizwan.demo.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank; 


public class UserRegisterRequest {
    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Password is mandatory")
    private String password;
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    private String email;

    // getters and setters
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }



}
