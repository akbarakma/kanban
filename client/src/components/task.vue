<template>
    <div class="container">
        <div :class="category.class">
            <div class="text-center m-3 p-2">
                <h2>{{ category.name }}</h2>
            </div>
        </div>
        <div class="overflow-auto" style="max-height: 60vh;">
            <div :key="task.index" v-for="task in task">
                <taskCard
                    :category="category.name"
                    :task="task"
                    @editDataForm="editDataForm"
                    @deleteData="deleteData"
                ></taskCard>
            </div>
        </div>
    </div>
</template>

<script>
import taskCard from './taskCard.vue';

export default {
    components: {
        taskCard
    },
    props: ['category', 'task'],
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