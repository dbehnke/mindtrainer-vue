<template>
    <div>
        <h2>Questions (This is a DEMO, things may be broken still)</h2>
        <div v-show="reset">
            <!-- <input v-model="numQuestions" placeholder="how many questions?"/>
            <p v-show="onError.length > 0">Value must be a number</p> -->
            <button class="ui button" v-on:click="loadQuestions()">Start</button>
        </div>
        <div v-show="!reset">
            <button class="ui button" v-on:click="resetQuestions()">Reset</button>
            <div class="ui centered segment">
                <div v-if="questionsAnswered == questions.length" class="ui label">{{scorePercent}}% correct</div>
                <div v-else class="ui label">{{questionsAnswered}} answered</div>
                <div class="ui green label">{{questionsCorrect}} Correct</div>
                <div class="ui red label">{{questionsWrong}} Wrong</div>
            </div>

            <div class="ui stackable vertically divided grid container">
                <div class="four wide column" 
                v-for="(question, index) in questions"
                :key="index">
                    <p>Question #{{index + 1}}</p>
                    <QuestionItem v-bind:question="question"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import he from 'he'
import QuestionItem from './QuestionItem.vue'

export default {
    name: 'Questions',
    components: {
        QuestionItem
    },
    data () { 
        return {
            numQuestions: 0,
            reset: true,
            onError: "",
            questions: [],
            questionsAnswered: 0,
            questionsCorrect: 0,
            questionsWrong: 0,
            scorePercent: 0
        }
    },
    methods: {
        loadQuestions() {
            this.reset = false
            axios.get("https://opentdb.com/api.php?amount=10").then((response) => {
                const q = response.data.results
                let questions = [];
                
                q.forEach(function (question) {
                    let qq = {}
                    qq.question = he.decode(question.question, { 'allowUnsafeSymbols': true })
                    qq.choices = []
                    //TODO choices {"choice": "text here", "isCorrectAnswer": false}
                    //TODO randomize choices
                    question.incorrect_answers.forEach(function (choice) {
                        qq.choices.push(he.decode(choice, { 'allowUnsafeSymbols': true }))
                    })
                    qq.selected = ""
                    qq.correct_answer = he.decode(question.correct_answer, { 'allowUnsafeSymbols': true })
                    qq.choices.push(qq.correct_answer)

                    //randomize the choice order
                    function shuffle(arra1) {
                        let ctr = arra1.length;
                        let temp;
                        let index;

                        // While there are elements in the array
                        while (ctr > 0) {
                    // Pick a random index
                            index = Math.floor(Math.random() * ctr);
                    // Decrease ctr by 1
                            ctr--;
                    // And swap the last element with it
                            temp = arra1[ctr];
                            arra1[ctr] = arra1[index];
                            arra1[index] = temp;
                        }
                        return arra1;
                    }
                    qq.answered = false
                    qq.choices == shuffle(qq.choices)

                    questions.push(qq)
                })
                this.questions = questions
            })
        },
        resetQuestions() {
            this.reset = true
            this.questionsAnswered = 0
            this.questionsCorrect = 0
            this.questionsWrong = 0
            this.scorePercent = 0        
        }
    },
    mounted() {
        this.$root.$on('questionAnswered', (isCorrect) => {
            this.questionsAnswered++
            if (isCorrect) this.questionsCorrect++
            else this.questionsWrong++
            this.scorePercent = (this.questionsCorrect / this.questionsAnswered) * 100.0
        })
    }
}
</script>