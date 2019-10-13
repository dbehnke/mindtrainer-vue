<template>
    <div>
        <p>{{question.question}}</p>
        <ul>
            <li>{{question.correct_answer}}</li>
            <li v-for="choice in question.incorrect_answers"
            :key="choice">{{choice}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["question"]
}
</script>