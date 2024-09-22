<template>
    <main class="d-flex justify-content-center">
        <BForm @submit="onSubmit" data-cy="newArticle-form" class="form col-md-6 mt-4">
            <BFormGroup id="input-group-1" label="Titre" label-for="title">
                <BFormInput id="title" data-cy="title" v-model="form.title" type="text" placeholder="Entrer un titre"
                    required />
            </BFormGroup>

            <BFormGroup id="input-group-2" class="mt-3" label="Description" label-for="description">
                <BFormInput id="description" data-cy="description" v-model="form.description"
                    placeholder="Entrer une description pour votre article" required />
            </BFormGroup>

            <BFormGroup id="input-group-3" class="mt-3" label="Image" label-for="image">
                <BFormInput id="image" data-cy="image" type="file" @change="handleFileChange" accept="image/*" />
            </BFormGroup>

            <div class="d-flex justify-content-center ">
                <BButton class="btn-color mt-4" type="submit" data-cy="send-button">Poster l'article</BButton>
            </div>
        </BForm>
    </main>
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
        form.imageUrl = input.files[0];
    }
};

const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);

    if (form.imageUrl) {
        formData.append('imageUrl', form.imageUrl);
    }

    try {
        await Articles.createArticle(formData);
        alert("L'article vient d'être posté.");
    } catch {
        alert("Impossible d'ajouter l'article");
    };
}

</script>

<style>
.form {
    border: 1px solid #7105bc;
    border-radius: 5%;
    padding: 5%
}

.btn-color {
    background-color: #7105bc !important;
}

.btn-color:hover {
    background-color: rgb(158, 79, 233) !important;
}
</style>