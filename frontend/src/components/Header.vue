<template>
    <BNavbar toggleable="lg">
        <BNavbarBrand><router-link to="/">Birds</router-link></BNavbarBrand>
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" is-nav>
            <BNavbarNav>
                <BNavItem><router-link to="/articles">Articles</router-link></BNavItem>
                <!-- <BNavItem href="#">Inscription</BNavItem>
                <BNavItem href="#">Connexion</BNavItem> -->
            </BNavbarNav>
        </BCollapse>
    </BNavbar>
</template>

<script setup>
import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem, BNavForm, BFormInput, BButton } from 'bootstrap-vue-next';
</script>

<style>
#navbar {
    background-color: #ac33ff;
}
</style>