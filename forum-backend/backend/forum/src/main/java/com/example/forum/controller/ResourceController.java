package com.example.forum.controller;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.forum.model.Resource;
import com.example.forum.service.ResourceService;

@RestController
@RequestMapping("/resource")
public class ResourceController {
    @Autowired
    ResourceService rs;
    
    @PostMapping("/upload")
    public ResponseEntity<Resource> upload(@RequestParam("file") MultipartFile file) throws IOException {
        Resource newResource = new Resource();
        newResource.setName(file.getOriginalFilename());
        newResource.setType(file.getContentType());
        newResource.setData(file.getBytes());
        Resource uploadedResource = rs.create(newResource);
        return new ResponseEntity<>(uploadedResource, HttpStatus.CREATED);
    }
    
    @GetMapping("/getdetails")
    public ResponseEntity<List<Resource>> getAllResources() {
        List<Resource> obj = rs.getAllResources();
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @GetMapping("/download/{resourceId}")
    public ResponseEntity<byte[]> download(@PathVariable("resourceId") int id) {
        Resource resource = rs.getResourceById(id);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + resource.getName())
                .body(resource.getData());
    }
    
    @DeleteMapping("/delete/{resourceId}")
    public ResponseEntity<Boolean> delete(@PathVariable("resourceId") int id) {
        if(rs.deleteResource(id)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }
}
