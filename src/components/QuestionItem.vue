<template>
    <div>
        <p>{{question.question}}</p>
        <div class="ui container">
            <div v-for="choice in question.choices"
            :key="choice">
                <button v-show="!question.answered" v-on:click="choiceSelected(question, choice)" class="fluid ui labeled icon button">
                    {{choice}}
                </button>
                <div v-show="question.answered">
                    <div v-show="isCorrect(question, choice)">
                        <div class="fluid ui icon green buttons">
                            <button v-show="choice == question.selected" class="ui button">
                                <i class="check icon"/>
                            </button>
                            <button class="ui button">
                                {{choice}}
                            </button>
                        </div>
                    </div>
                    <div v-show="!isCorrect(question, choice)">
                        <div v-if="choice == question.selected">
                            <div class="fluid ui icon red buttons">
                                <button class="ui button">
                                    <i class="check icon"/>
                                </button>
                                <button class="ui button">
                                    {{choice}}
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <button class="fluid ui button">
                                {{choice}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["question"],
    methods: {
        choiceSelected(question, choice) {
            if (!question.answered) {
                question.selected = choice
                question.answered = true
            }
            
        },
        isCorrect(question, choice) {
            return question.correct_answer == choice
        }
    }
}
</script>