<template>
    <div>
        <h1>Voir les articles</h1>
        <BButton><router-link to="addNewArticle">Ajouter un nouvel article</router-link></BButton>
        <main>
            <BCard v-for="article in articles" :key="article._id">
                <BCardImg :src="article.imageUrl" alt="Image" />
                <BCardBody>
                    <BCardTitle>{{ article.title }}</BCardTitle>
                    <p>{{ article.description }}</p>
                </BCardBody>
                <BButton @click="deleteArticle(article._id)">Supprimer l'article</BButton>
            </BCard>
        </main>
    </div>
</template>

<script setup>
import { BCard, BCardImg, BCardTitle, BCardBody, BButton } from 'bootstrap-vue-next';
import Articles from "../api/Articles";
import { onMounted, ref } from 'vue';

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