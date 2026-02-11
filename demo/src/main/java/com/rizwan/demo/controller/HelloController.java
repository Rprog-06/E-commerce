
package com.rizwan.demo.controller;

// import org.springframework.http.ResponseEntity;
// import org.springframework.data.domain.Page;
// import org.springframework.http.HttpStatus;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.validation.annotation.Validated;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import jakarta.validation.Valid;

//  import com.rizwan.demo.dto.UserRequest;
// import com.rizwan.demo.dto.UserUpdateRequest;
// import com.rizwan.demo.service.HelloService;
//  import com.rizwan.demo.service.UserService;
//  import com.rizwan.demo.entity.User;
//  import java.util.List;
 
// @RestController
// public class HelloController {

//     private final HelloService helloService;
//     private final UserService userService;

//     public HelloController(
//             HelloService helloService,
//             UserService userService
//     ) {
//         this.helloService = helloService;
//         this.userService = userService;
//     }

//     @GetMapping("/age")
//     public String age(@RequestParam int age) {
//         return "Your age is " + age + " years.";
//     }

//     @PostMapping("/user")
//     public ResponseEntity<String> createUser(
//             @Valid @RequestBody UserRequest userRequest
//     ) {
//         userService.createUser(
//                 userRequest.getName(),
//                 userRequest.getAge()
//         );
//         return ResponseEntity.status(HttpStatus.CREATED)
//                 .body("User created successfully");
//     }

//     @GetMapping("/users")
//     public ResponseEntity<List<User>> getAllUsers() {
//         return ResponseEntity.ok(userService.getAllUsers());
//     }

//     @GetMapping("/user/{id}")
//     public ResponseEntity<User> getUserById(@PathVariable Long id) {
//         return ResponseEntity.ok(userService.getUserById(id));
//     }
//     @PutMapping("/user/{id}")
// public ResponseEntity<User> updateUser(
//         @PathVariable Long id,
//         @Valid @RequestBody UserUpdateRequest request
// ) {
//     return ResponseEntity.ok(
//             helloService.updateUser(id, request.getName(), request.getAge())
//     );
// }
// @DeleteMapping("/user/{id}")
// public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
//     helloService.deleteuser(id);
//     return ResponseEntity.noContent().build();
// }
// @GetMapping("/getuser")
// public ResponseEntity<Page<User>> getUsers(
//         @RequestParam(defaultValue = "0") int page,
//         @RequestParam(defaultValue = "5") int size
// ) {
//     return ResponseEntity.ok(userService.getUsers(page, size));
// }
// @GetMapping("/users/sorted")
// public ResponseEntity<List<User>> getUsersSorted(
//         @RequestParam(defaultValue = "id") String sortBy,
//         @RequestParam(defaultValue = "asc") String direction
// ) {
//     return ResponseEntity.ok(
//         userService.getUsersSorted(sortBy, direction)
//     );
// }
//   @GetMapping("/users/page")
// public ResponseEntity<Page<User>> getUsersPagedSorted(
//         @RequestParam int page,
//         @RequestParam int size,
//         @RequestParam(defaultValue = "id") String sortBy,
//         @RequestParam(defaultValue = "desc") String direction
// ) {
//     return ResponseEntity.ok(
//         userService.getUsersPagedSorted(page, size, sortBy,direction)
//     );
// }

// }



