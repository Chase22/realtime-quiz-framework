<template>
  <div class="alert alert-secondary admin-panel" role="alert">
    <h4 class="alert-heading">Host control panel</h4>
    <hr/>
    <div v-if="showAnswer">
      <button
          type="button"
          class="btn btn-dark btn-next"
          @click="showNextQuestion()"
      >
        Show next question
      </button>
      <br/>
      <button type="button" class="btn btn-link end-btn" @click="endQuizNow()">
        End quiz and show results
      </button>
    </div>
    <div v-else>
      <button
          type="button"
          class="btn btn-dark btn-next"
          @click="endQuestionNow()"
      >
        End question now
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  props: ['hostAdminCh', 'prevQuestionNumber', 'showAnswer'],
  methods: {
    showNextQuestion() {
      this.hostAdminCh.publish('next-question', {
        prevQIndex: this.prevQuestionNumber - 1
      });
    },
    endQuizNow() {
      this.hostAdminCh.publish('end-quiz-now', {
        end: true
      });
      this.$emit('end-quiz-now');
    },
    endQuestionNow() {
      this.hostAdminCh.publish('end-question-now', {})
    }
  }
};
</script>

<style scoped>
.admin-panel {
  width: 90%;
  margin: 20px auto;
  text-align: center;
}

.btn-next {
  margin-bottom: 20px;
}

.end-btn {
  font-size: 12px;
  margin: 0px;
}
</style>
