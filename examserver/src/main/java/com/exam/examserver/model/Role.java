package com.exam.examserver.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    private Long roleId;
    private String rolename;

    @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY,mappedBy ="role" )
    private Set<UserRole> userRoles = new HashSet<>();

    public Role() {
    }


    public Role(Long roleId, String rolename) {
        this.roleId = roleId;
        this.rolename = rolename;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }
}
