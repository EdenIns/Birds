<template>
    <BForm @submit="onSubmit" data-cy="newArticle-form">
        <BFormGroup id="input-group-1" label="Titre" label-for="title">
            <BFormInput id="title" data-cy="title" v-model="form.title" type="text" placeholder="Entrer un titre" required />
        </BFormGroup>

        <BFormGroup id="input-group-2" label="Description" label-for="description">
            <BFormInput id="description" data-cy="description" v-model="form.description" placeholder="Entrer une description pour votre article"
                required />
        </BFormGroup>

        <BFormGroup id="input-group-3" label="Image" label-for="image">
            <BFormInput id="image" data-cy="image" type="file" @change="handleFileChange" accept="image/*"/>
        </BFormGroup>

        <BButton type="submit" data-cy="send-button">Poster l'article</BButton>
    </BForm>

</template>

<script setup>
import { reactive } from 'vue';
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next';
import Articles from '../api/Articles';

const form = reactive({
    title: '',
    description: '',
    imageUrl: null,
});

const handleFileChange = (event) => {
    const input = event.target;
    if (input.files && input.files.length > 0) {
        form.imageUrl = input.files[0].name;
    }
};

const onSubmit = async (event) => {
    event.preventDefault();
    const newArticle = {
        ...form,
        imageUrl: form.imageUrl ? form.imageUrl : null,
    };
    try {
        await Articles.createArticle(newArticle);
        alert("L'article vient d'être posté.");
    } catch {
        alert("Impossible d'ajouter l'article");
    };
}

</script>