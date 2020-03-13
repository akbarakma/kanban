<template>
<div class="overflow-auto" style="max-height: 60vh;" v-if="task.category === category">
    <div class="card mb-2">
        <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">{{ task.description }}</p>
            <a href="" class="btn btn-primary" v-on:click.prevent="editDataForm(task.id)">Edit</a>
            <a href="" class="btn btn-primary" v-on:click.prevent="deleteData(task.id)">Delete</a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['task', 'category'],
    methods: {
        editDataForm(id) {
            this.$emit('editDataForm', id);
        },
        deleteData(id) {
            this.$emit('deleteData', id);
        }
    }
}
</script>