package com.hrms.hw.api.controllers;

import com.hrms.hw.business.abstracts.SystemEmployeeService;
import com.hrms.hw.core.utilities.results.DataResult;
import com.hrms.hw.core.utilities.results.ErrorDataResult;
import com.hrms.hw.entities.concretes.SystemEmployee;
import com.hrms.hw.entities.concretes.dtos.SystemEmployeesAddDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/systemEmployees")
public class SystemEmployeesController {

    private final SystemEmployeeService systemEmployeeService;

    @GetMapping("/getAll")
    public DataResult<List<SystemEmployee>> getAll() {
        return systemEmployeeService.getAll();
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@Valid @RequestBody SystemEmployeesAddDto systemEmployeesAddDto) {
        return ResponseEntity.ok(systemEmployeeService.add(systemEmployeesAddDto));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDataResult<Object> handleValidationExceptions(MethodArgumentNotValidException exceptions) {
        Map<String, String> validationErrors = new HashMap<>();
        for (FieldError fieldError : exceptions.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return new ErrorDataResult<>("Error", validationErrors);
    }
}