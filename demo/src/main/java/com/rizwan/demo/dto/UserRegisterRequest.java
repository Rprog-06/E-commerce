package com.rizwan.demo.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank; 
import jakarta.validation.constraints.NotNull;
import com.rizwan.demo.enums.Role;


public class UserRegisterRequest {
    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Password is mandatory")
    private String password;
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    private String email;
   @NotNull(message = "Role is mandatory")
    private Role role;

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
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }

}
