<template>
    <BNavbar toggleable="lg">
        <BNavbarBrand><router-link to="/">Birds</router-link></BNavbarBrand>
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" is-nav>
            <BNavbarNav>
                <BNavItem><router-link to="/articles">Articles</router-link></BNavItem>
                <BNavItem v-if="!authStore.isAuthenticated">
                    <router-link to="/signup">Inscription</router-link>
                </BNavItem>
                <BNavItem v-if="!authStore.isAuthenticated">
                    <router-link to="/login">Connexion</router-link>
                </BNavItem>
                <BNavItem v-if="authStore.isAuthenticated" @click="clickLogout">
                    Déconnexion
                </BNavItem>
            </BNavbarNav>
        </BCollapse>
    </BNavbar>
</template>

<script setup>
import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem, BNavForm, BFormInput, BButton } from 'bootstrap-vue-next';
import { useAuthStore } from '../stores/AuthStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

function clickLogout() {
    authStore.logout();
}

</script>

<style>
#navbar {
    background-color: #ac33ff;
}
</style>