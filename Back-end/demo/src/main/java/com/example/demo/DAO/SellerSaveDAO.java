package com.example.demo.DAO;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.demo.Model.Seller;

public class SellerSaveDAO {
    @NotNull(message = "O campo nome é obrigatório")
    @Size(min = 5, max = 100, message = "O campo nome deve ter entre 5 e 100 caracteres")
    private String name;

    @NotNull(message = "O campo salario é obrigatório")
    @Min(0)
    private double salary;

    @NotNull(message = "O campo percentualbonificacao é obrigatório")
    @Min(0)
    private double bonus;

    @NotNull(message = "O campo genero é obrigatório")
    private Integer gender;

    public SellerSaveDAO() {

    }

    public SellerSaveDAO( String name,double salary,double bonus,Integer gender) {
        this.name = name;
        this.salary = salary;
        this.bonus = bonus;
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public double getBonus() {
        return bonus;
    }

    public void setBonus(double bonus) {
        this.bonus = bonus;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

     public Seller toEntity(){
        Seller seller = new Seller();
        seller.setName(name);
        seller.setSalary(salary);
        seller.setBonus(bonus);
        seller.setGender(gender);
        return seller;
    }
}
