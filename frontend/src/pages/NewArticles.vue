<template>
    <BForm @submit="onSubmit" @reset="onReset" v-if="show">
        <BFormGroup id="input-group-1" label="Titre" label-for="input-1">
            <BFormInput id="input-1" v-model="form.title" type="text" placeholder="Entrer un titre" required />
        </BFormGroup>

        <BFormGroup id="input-group-2" label="Description" label-for="input-2">
            <BFormInput id="input-2" v-model="form.description" placeholder="Entrer une description pour votre article"
                required />
        </BFormGroup>

        <BFormGroup id="input-group-3" label="Image" label-for="input-3">
            <BFormInput id="input-3" type="file" @change="handleFileChange" accept="image/*"/>
        </BFormGroup>

        <BButton type="submit" variant="primary">Poster l'article</BButton>
    </BForm>

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next';
import Articles from '../api/Articles';

const form = reactive({
    title: '',
    description: '',
    imageUrl: null,
});

const show = ref(true);


const handleFileChange = (event) => {
    const input = event.target;
    if (input.files && input.files.length > 0) {
        form.imageUrl = input.files[0].name;
    }
};

const onSubmit = (event) => {
    event.preventDefault();
    const newArticle = {
        ...form,
        imageUrl: form.imageUrl ? form.imageUrl : null,
    };
    try {
        const addedArticle = Articles.createArticle(newArticle);
        alert("L'article vient d'être posté.");
    } catch {
        alert("Impossible d'ajouter l'article");
    };
}

const onReset = (event) => {
    event.preventDefault();
    form.email = '';
    form.name = '';
};

</script>