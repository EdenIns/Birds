<template>
    <div>
        <h1 class="d-flex justify-content-center mt-4 mb-4">Fil d'actualité</h1>
        <!-- <BButton><router-link to="addNewArticle">Ajouter un nouvel article</router-link></BButton> -->
        <main>
            <BCard v-for="article in articles" :key="article._id" class="col-md-4">
                <BRow class="d-flex flex-column">
                    <BCol>
                        <BCardBody>
                            <BCardTitle>{{ article.title }}</BCardTitle>
                            <p>{{ article.description }}</p>
                        </BCardBody>
                        <!-- <BButton @click="deleteArticle(article._id)">Supprimer l'article</BButton> -->
                    </BCol>
                    <BCol>
                        <BCardImg :src="baseUrl + article.imageUrl" alt="Image" class="images" />
                    </BCol>
                </BRow>
            </BCard>
        </main>
    </div>
</template>

<script setup>
import { BCard, BCardImg, BCardTitle, BCardBody, BButton, BRow, BCol } from 'bootstrap-vue-next';
import Articles from "../api/Articles";
import { onMounted, ref } from 'vue';
const baseUrl = import.meta.env.VITE_API_URL

const articles = ref([]);

const fetchArticles = async () => {
    try {
        articles.value = await Articles.getArticles();
        console.log(articles.value);
    } catch (error) {
        console.error("Erreur lors de la récuperation des articles:", error);
    }
};

const deleteArticle = async idArticle => {
    const confirmed = window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette article ?"
    );
    if (confirmed) {
        try {
            await Articles.deleteArticle(idArticle);
            fetchArticles();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article:", error);
        }
    }
}

onMounted(fetchArticles);
</script>

<style>
.images {
    width: 250px;
    height: 250px;
    object-fit: contain;
}
</style>