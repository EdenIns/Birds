<template>
    <main class="d-flex justify-content-center">
        <BRow class="d-flex flex-column">
            <BCol>
                <h1 class="d-flex justify-content-center mt-4">Mon profil</h1>
                <BForm @submit="onSubmit" class="form mt-4" data-cy="signup-form">
                    <BFormGroup id="input-group-1" label="Adresse email:" label-for="email">
                        <BFormInput id="email" data-cy="email" v-model="form.email" type="email"
                            :class="{ 'is-invalid': validated && !emailState }" required />
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
                            :class="{ 'is-invalid': validated && form.password !== '' && !passwordState }"
                            placeholder="Entrer un mot de passe" />
                        <span class="span">Le mot de passe doit être entre 8 et 12 caractères et doit contenir au moins
                            1 majuscule, 1 minuscule et 1 caractère spécial.</span>
                        <div v-if="validated && form.password !== '' && !passwordState" class="text-danger">
                            Mot de passe invalide
                        </div>
                    </BFormGroup>
                    <div class="d-flex justify-content-center ">
                        <BButton class="btn-color mt-4" type="submit" data-cy="send-button">Mettre à jour</BButton>
                    </div>
                </BForm>
            </BCol>

            <BCol>
                <h2 class="d-flex justify-content-center mt-4 mb-4">Mes articles :</h2>
                <BButton class="mb-4"><router-link to="addNewArticle" class="routerLink">Ajouter un nouvel
                        article</router-link></BButton>
                <BRow>
                    <BCol v-for="article in articles" :key="article._id" class="col-12 col-md-6 mb-4">
                        <template v-if="typeof article === 'string'">
                            <p>Pas d'article pour le moment</p>
                        </template>
                        <template v-else>
                            <BCard>
                                <BRow class="d-flex flex-column">
                                    <BCol>
                                        <BCardBody>
                                            <BCardTitle>{{ article.title }}</BCardTitle>
                                            <p>{{ article.description }}</p>
                                        </BCardBody>
                                    </BCol>
                                    <BCol>
                                        <BCardImg :src="baseUrl + article.imageUrl" alt="Image" class="images" />
                                    </BCol>
                                    <BButton @click="deleteArticle(article._id)">Supprimer l'article</BButton>
                                </BRow>
                            </BCard>
                        </template>
                    </BCol>
                </BRow>
            </BCol>
        </BRow>
    </main>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import { BCard, BCardImg, BCardTitle, BCardBody, BForm, BFormGroup, BFormInput, BButton, BRow, BCol } from 'bootstrap-vue-next';
import { useRouter } from 'vue-router';
import Users from '../api/Users';
import Articles from '../api/Articles';
const baseUrl = import.meta.env.VITE_API_URL

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
const articles = ref([]);

onMounted(async () => {
    try {
        const user = await Users.getUserConnected();
        form.email = user.email || '';
        form.pseudo = user.pseudo || '';
        form.password = '';
        form._id = user._id || '';
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
    }

    try {
        articles.value = await Articles.getArticlesUserConnected();
    } catch (error) {
        console.error("Erreur lors de la récuperation des articles:", error);
    }
});

const onSubmit = async (event) => {
    event.preventDefault();
    validated.value = true;
    console.log(form)

    try {
        await Users.updateUserProfil(form);
        alert("Vos informations sont modifiées.");
    } catch (error) {
        alert("Problème lors de la modification des informations client.");
    }
};

const deleteArticle = async idArticle => {
    const confirmed = window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette article ?"
    );
    if (confirmed) {
        try {
            await Articles.deleteArticle(idArticle);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article:", error);
        }
    }
}
</script>

<style>
.is-invalid {
    border: 1px solid red;
}

.form {
    border: 1px solid #7105bc;
    border-radius: 5%;
    padding: 5%;
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

.images {
    max-width: 100%;
    height: auto;
}

.routerLink {
    color: white;
    text-decoration: none;
    transition: transform 0.2s ease, color 0.2s ease;
}
</style>
