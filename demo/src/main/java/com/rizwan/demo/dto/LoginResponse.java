package com.rizwan.demo.dto;

public class LoginResponse {
    private Long Id;
    private String name;
    private String token;
    private String role;
    private String email;

    public LoginResponse() {
       
    }
    public void setId(Long Id) {
        this.Id = Id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Long getId() { return Id; }
    public String getName() { return name; }
    public String getToken() { return token; }
    public String getRole() { return role; }
    public String getEmail() { return email; }
}

