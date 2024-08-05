package com.example.forum.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.forum.model.Category;
import com.example.forum.repository.CategoryRepository;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository cr;
    
    public Category create(Category c) {
        return cr.save(c);
    }
    
    public List<Category> getAllCategories() {
        return cr.findAll();
    }
    
    public Category getCategoryById(int id) {
        return cr.findById(id).orElse(null);
    }
    
    public boolean updateCategory(int id, Category c) {
        if(this.getCategoryById(id) == null) {
            return false;
        }
        try {
            cr.save(c);
        } catch(Exception e) {
            return false;
        }
        return true;
    }
    
    public boolean deleteCategory(int id) {
        if(this.getCategoryById(id) == null) {
            return false;
        }
        cr.deleteById(id);
        return true;
    }
}
