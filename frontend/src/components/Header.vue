<template>
    <BNavbar id="navbar" toggleable="lg">
        <BCol md="4">
            <BNavbarBrand>
                <router-link to="/">
                    <img src="../assets/images/oiseaub.png" alt="Logo" class="logo" />
                </router-link>
            </BNavbarBrand>
        </BCol>
        <BCol md="4">
            <router-link class="routerLink" to="/">
                <h1 class="d-none d-md-block d-md-flex justify-content-md-center">BIRDS</h1>
            </router-link>
        </BCol>
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" is-nav>
            <BCol md="4">
                <BNavbarNav class="d-md-flex justify-content-md-start">
                    <BNavItem v-if="!authStore.isAuthenticated">
                        <router-link class="routerLink" to="/signup">Inscription</router-link>
                    </BNavItem>
                    <BNavItem v-if="!authStore.isAuthenticated">
                        <router-link class="routerLink" to="/login">Connexion</router-link>
                    </BNavItem>
                    <BNavItem v-if="authStore.isAuthenticated" @click="clickLogout">
                        <p class="deco">Déconnexion</p>
                    </BNavItem>
                </BNavbarNav>
            </BCol>
        </BCollapse>
    </BNavbar>
</template>

<script setup>
import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem, BCol } from 'bootstrap-vue-next';
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
    background-color: #7105bc;
}

.routerLink {
    color: white;
    text-decoration: none;
    transition: transform 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
    transform: scale(1.1);
}

.logo {
    width: 50px;
    height: auto;
    object-fit: contain;
}

.deco{
    color:white;
}
</style>