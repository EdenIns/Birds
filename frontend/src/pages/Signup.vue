<template>
    <h1 class="d-flex justify-content-center mt-4">Inscription</h1>
    <main class="d-flex justify-content-center">
        <BForm @submit="onSubmit" class="form col-md-6 mt-4" data-cy="signup-form">

            <BFormGroup id="input-group-1" label="Adresse email:" label-for="email">
                <BFormInput id="email" data-cy="email" v-model="form.email" type="email"
                    :class="{ 'is-invalid': validated && !emailState }" placeholder="Entrer un email" />
                <div v-if="validated && !emailState" class="text-danger">
                    Adresse email invalide
                </div>
            </BFormGroup>

            <BFormGroup id="input-group-2" class="mt-3" label="Pseudo:" label-for="pseudo">
                <BFormInput id="pseudo" data-cy="pseudo" v-model="form.pseudo"
                    :class="{ 'is-invalid': validated && form.pseudo.length < 4 }" type="text"
                    placeholder="Entrer un pseudo" required />
                <div v-if="validated && form.pseudo.length < 4" class="text-danger">
                    Le pseudo doit contenir au moins 4 caractères
                </div>
            </BFormGroup>

            <BFormGroup id="input-group-3" class="mt-3" label="Mot de passe:" label-for="password">
                <BFormInput id="password" data-cy="password" v-model="form.password" type="password"
                    :class="{ 'is-invalid': validated && !passwordState }" placeholder="Entrer un mot de passe"
                    required />
                <span class="span">Le mot de passe doit être entre 8 et 12 caractères et doit contenir au moins 1 majuscule, au moins
                    1
                    minuscule et 1 caractère spécial.</span>
                <div v-if="validated && !passwordState" class="text-danger">
                    Mot de passe invalide
                </div>
            </BFormGroup>
            <div class="d-flex justify-content-center ">
                <BButton class="btn-color mt-4" type="submit" data-cy="send-button">S'inscrire</BButton>
            </div>
        </BForm>
    </main>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next';
import { useRouter } from 'vue-router';
import Users from '../api/Users';

const form = reactive({
    email: '',
    pseudo: '',
    password: ''
});

const validated = ref(false);

const emailState = computed(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(form.email);
});

const passwordState = computed(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/;
    return passwordRegex.test(form.password);
});

const router = useRouter();

const onSubmit = async (event) => {
    event.preventDefault();
    validated.value = true;

    if (!emailState.value || !passwordState.value || form.pseudo.length < 4) {
        alert('Veuillez corriger les erreurs dans le formulaire.');
        return;
    }
    console.log(form)
    try {
        await Users.signup(form);
        router.push("./login");
    } catch {
        alert("Problème lors de l'inscription.");
    };
};
</script>

<style>
.is-invalid {
    border: 1px solid red;
}

.form {
    border: 1px solid #7105bc;
    border-radius: 5%;
    padding: 5%
}

.span {
    font-size: 70%;
}

.btn-color {
    background-color: #7105bc !important;
}

.btn-color:hover {
    background-color: rgb(158, 79, 233) !important;
}
</style>