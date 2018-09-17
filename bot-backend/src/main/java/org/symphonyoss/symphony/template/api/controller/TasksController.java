package org.symphonyoss.symphony.template.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tasks")
public class TasksController {

  @RequestMapping(value = "", method = RequestMethod.GET)
  public ResponseEntity findAll() {
    return ResponseEntity.ok().build();
  }
}
