package com.example.demo.DAO;

public class SellerDAO {
    private Long id;
    private String name;
    private Double salary;
    private Double bonus;
    private Integer gender;
    
    public SellerDAO() {
    }

    public SellerDAO(Long id, String name, Double salary, Double bonus, Integer gender) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.bonus = bonus;
        this.gender = gender;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public Double getBonus() {
        return bonus;
    }

    public void setBonus(Double bonus) {
        this.bonus = bonus;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    
}
