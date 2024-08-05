package com.example.forum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.forum.model.User;
import com.example.forum.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    UserRepository ur;

    public User create(User uu)
    {
        return ur.save(uu);
    }

    public List <User> getAlldetails()
    {
        return ur.findAll();
    }
    public User getUserById(int id)
    {
        return ur.findById(id).orElse(null);
    }
    public boolean updateDetails(int id,User u)
    {
        if(this.getUserById(id)==null)
        {
            return false;
        }
        try{
            ur.save(u);
        }
        catch(Exception e)
        {
            return false;
        }
        return true;
    }
    public boolean deleteUser(int id)
    {
        if(this.getUserById(id) == null)
        {
            return false;
        }
        ur.deleteById(id);
        return true;
    }
}