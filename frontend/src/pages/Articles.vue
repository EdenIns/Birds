<template>
    <div>
        <h1 class="d-flex justify-content-center mt-4 mb-4">Fil d'actualité</h1>

        <BRow class="g-4">
            <BCol v-for="article in articles" :key="article._id" cols="12" md="6">
                <BCard>
                    <BCardImg :src="baseUrl + article.imageUrl" alt="Image de l'article" class="images" />
                    <BCardBody>
                        <BCardTitle>{{ article.title }}</BCardTitle>
                        <p>{{ article.description }}</p>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
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

onMounted(fetchArticles);
</script>

<style>
.images {
    width: 200px;
    height: 200px;
    object-fit: contain;
}
</style>