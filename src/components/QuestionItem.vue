<template>
    <div>
        <p>{{question.question}}</p>
        <div class="ui container">
            <div v-for="choice in question.choices"
            :key="choice">
                <button v-on:click="question.selected = choice" class="fluid ui labeled icon button">
                    <i v-show="question.selected == choice" class="check icon"/>
                    {{choice}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["question"]
}
</script>