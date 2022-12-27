<template>
  <div class="time-tracking-body">
    <span />
    <TimeDuration :timeIn="timeIn" :timeOut="timeOut" :dateServer="dateServer"/>
    <div class="button-clock d-flex justify-content-center">
      <Button
        :buttonClass="'md-raised md-primary button-layout'"
        :buttonTitle="$t('employeeSite.btnClockIn')"
        @on-click="onClickClockInBtn"
        v-show="isClockInShow"
        :disable="isClockInDisable"
      />
      <Button
        :buttonClass="'md-accent md-raised button-layout'"
        :buttonTitle="$t('employeeSite.btnClockOut')"
        @on-click="onClickClockOutBtn"
        :disable="isClockOutDisable"
      />
    </div>
    <div class="notification-modal">
      <Notification
        :notiHeaderBgColor="notiType"
        :notiTitle="notiTitle"
        :notiBody="notiBody"
        :okButtonOnly="false"
        :onClickOkButton="onClickOkButton"
        :onClickCancelButton="onClickCancelButton"
        :isModalShowed="isTimeConfirmModalShowed"
      />
    </div>
    <div class="notification-modal">
      <Notification
        :notiHeaderBgColor="notiType"
        :notiTitle="notiTitle"
        :notiBody="notiBody"
        :okButtonOnly="true"
        :onClickOkButton="onClickErrorOkButton"
        :isModalShowed="isErrorModalShowed"
      />
    </div>
  </div>
</template>

<script src="./TimeTracking.js"></script>
<style src="./TimeTracking.css"></style>
