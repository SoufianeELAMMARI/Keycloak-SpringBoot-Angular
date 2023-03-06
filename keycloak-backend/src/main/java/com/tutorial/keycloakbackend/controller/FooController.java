package com.tutorial.keycloakbackend.controller;

import com.tutorial.keycloakbackend.dto.ResponseMessage;
import com.tutorial.keycloakbackend.model.Foo;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.AccessToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/foo")
@CrossOrigin
public class FooController {

    List<Foo> foos =
            Stream.of(new Foo(1, "foo 1"),
                    new Foo(2, "foo 2"),
                    new Foo(3, "foo 3")).collect(Collectors.toList());

    @GetMapping("/list")
    public ResponseEntity<List<Foo>> list(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        KeycloakPrincipal principal = (KeycloakPrincipal)auth.getPrincipal();


        KeycloakSecurityContext session = principal.getKeycloakSecurityContext();
        AccessToken accessToken = session.getToken();
        String username = accessToken.getPreferredUsername();
        String emailID = accessToken.getEmail();
        String lastname = accessToken.getFamilyName();
        String firstname = accessToken.getGivenName();
        String realmName = accessToken.getIssuer();
        AccessToken.Access realmAccess = accessToken.getRealmAccess();
        return new ResponseEntity(foos, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Foo> detail(@PathVariable("id") int id){
        Foo foo = foos.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
        return new ResponseEntity(foo, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Foo foo){
        int maxIndex = foos.stream().max(Comparator.comparing(m -> m.getId())).get().getId();
        foo.setId(maxIndex + 1);
        foos.add(foo);
        return new ResponseEntity(new ResponseMessage("creado"), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Foo foo){
        Foo fooUpdate = foos.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
        fooUpdate.setName(foo.getName());
        return new ResponseEntity(new ResponseMessage("actualizado"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id){
        Foo foo = foos.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
        foos.remove(foo);
        return new ResponseEntity(new ResponseMessage("eliminado"), HttpStatus.OK);
    }


}
