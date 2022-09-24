<script src="./ClockOutNotification.js"></script>
<style scoped src="./ClockOutNotification.css"></style>

<template>
  <div class="noti-container">
    <b-modal
      :header-bg-variant="notiHeaderBgColor"
      :header-text-variant="notiHeaderTextColor"
      id="modal-center"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      :ok-only="okButtonOnly"
      @ok="onClickOkButton()"
      @cancel="onClickCancelButton()"
      v-model="isModalShowed"
      nl2br="true"
      scrollable
    >
      <template #modal-header>
        <h3 class="noti-header">{{ notiTitle }}</h3>
      </template>
      <p class="my-3 modal-body-text">{{ notiBody }}</p>

      <div class="content-layout">
        <label class="label-layout">{{labelInput}}</label>
        <span />
        <Input @on-input="clickInputBreakTime" :inputType="'number'" />
      </div>

      <span class="error-label" v-if="isBreakTimeTotalEmpty">
        {{errorLabelInput}}
      </span>
    </b-modal>
  </div>
</template>
