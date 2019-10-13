<template>
    <div>
        <h2>Questions</h2>
        <div v-show="reset">
            <input v-model="numQuestions" placeholder="how many questions?"/>
            <p v-show="onError.length > 0">Value must be a number</p>
            <button v-on:click="loadQuestions()">Start</button>
        </div>
        <div v-show="!reset">
            <button v-on:click="resetQuestions()">Reset</button>
        
            <div class="ui card" v-for="(question, index) in questions"
                    :key="question.question">
                <div class="content">
                    <div class="header">Question #{{index}}</div>
                </div>
                <div class="content">
                    <p>{{question.question}}</p>
                </div>
                <div class="extra content">
                    <button class="ui button">Join Project</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import he from 'he'

export default {
    name: 'Questions',
    data () { 
        return {
            numQuestions: 0,
            reset: true,
            onError: "",
            questions: [{"id": 0, "title": "poop"},
            {"id": 1, "title": "poop"},{"id": 2, "title": "poop"}] 
        }
    },
    methods: {
        loadQuestions() {
            this.reset = false
            axios.get("https://opentdb.com/api.php?amount=10").then((response) => {
                const q = response.data.results
                let questions = [];
                q.forEach(function (question, index) {
                    let qq = question
                    qq.question = he.decode(qq.question, { 'allowUnsafeSymbols': true })
                    //TODO choices {"choice": "text here", "isCorrectAnswer": false}
                    //TODO randomize choices
                    questions.push(qq)
                });
                this.questions = questions
            })
        },
        resetQuestions() {
            this.reset = true
        }
    },
}
</script>