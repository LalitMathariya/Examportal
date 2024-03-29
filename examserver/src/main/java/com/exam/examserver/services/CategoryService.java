package com.exam.examserver.services;

import com.exam.examserver.model.exam.Category;

import java.util.Set;

public interface CategoryService {

    public Category addCategory(Category category);
    public Category updateCategory(Category category);
    public Set<Category> getCategories();
    public Category getCategory(Long CategoryId);
    public void deleteCategory(Long categoryId);
}
