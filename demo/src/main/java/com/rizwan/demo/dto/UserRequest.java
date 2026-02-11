package com.rizwan.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;

public class UserRequest {

    @NotBlank(message = "Name is mandatory")
    private String name;
    @Min(value = 18, message = "Age must be at least 18")
    private int age;

    // getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
