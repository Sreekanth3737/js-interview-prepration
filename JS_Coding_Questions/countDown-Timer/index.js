class CountDownTimer {
  constructor() {
    this.totalTime = 0;
    this.currentTime = 0;
    this.originalTime = 0;
    this.intervalId = null;
    this.isRunning = false;
    this.isPaused = false;
    //elements
    this.initializeElements();
    this.bindEvents();
    this.updateDisplay();
    this.updateProgress();
  }

  initializeElements() {
    this.hoursInput = document.getElementById("hours");
    this.minutesInput = document.getElementById("minutes");
    this.secondsInput = document.getElementById("seconds");

    this.display = document.getElementById("display");

    this.startBtn = document.getElementById("startBtn");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.stopBtn = document.getElementById("stopBtn");
    this.resetBtn = document.getElementById("resetBtn");

    this.status = document.getElementById("status");
    this.progressFill = document.getElementById("progressFill");
  }

  handleKeyPress(e) {
    switch (e.key) {
      case " ":
        e.preventDefault();
        if (this.isRunning) {
          this.pause();
        } else if (this.isPaused) {
          this.start();
        }
        break;
      case "Escape":
        if (this.isRunning || this.isPaused) {
          this.stop();
        }
        break;
      case "r":
      case "R":
        if (!this.isRunning) {
          this.reset();
        }
        break;
    }
  }

  bindEvents() {
    this.startBtn.addEventListener("click", () => this.start());
    this.pauseBtn.addEventListener("click", () => this.pause());
    this.stopBtn.addEventListener("click", () => this.stop());
    this.resetBtn.addEventListener("click", () => this.reset());

    const inputArr = [this.hoursInput, this.minutesInput, this.secondsInput];
    inputArr.forEach((input) => {
      input.addEventListener("input", (e) => this.handleChange(e));
    });
    document.addEventListener("keydown", (e) => this.handleKeyPress(e));
  }

  handleChange(e) {
    if (!this.isPaused || !this.isRunning) {
      this.validateInput(e);
      this.calculateTime();
      this.updateDisplay();
      this.updateProgress();
    } else {
      this.updateInputsFromCurrentTime();
      this.updateStatus("Cannot modify time while timer is active", "running");
    }
  }

  validateInput(e) {
    console.log(e, "event");
    const input = e.target;
    let value = parseInt(input.value) || 0;
    const min = parseInt(input.min);
    const max = parseInt(input.max);
    if (value < min) value = min;
    if (value > max) value = max;
    input.value = value;
  }

  calculateTime() {
    const hours = parseInt(this.hoursInput.value) || 0;
    const minutes = parseInt(this.minutesInput.value) || 0;
    const seconds = parseInt(this.secondsInput.value) || 0;

    this.totalTime = 3600 * hours + minutes * 60 + seconds;
    this.currentTime = this.totalTime;
    this.originalTime = this.totalTime;
  }
  start() {
    if (!this.isPaused) {
      this.calculateTime();
      if (this.currentTime <= 0) {
        this.updateStatus("Please set a time greater than 0", "idle");
        return;
      }
    }
    this.isRunning = true;
    this.isPaused = false;

    this.updateButtons();
    this.updateStatus("Timer running...", "running");

    this.intervalId = setInterval(() => {
      this.currentTime--;
      this.updateDisplay();
      this.updateProgress();
      if (this.currentTime <= 0) {
        this.finish();
      }
    }, 1000);
  }
  pause() {
    if (this.isRunning) {
      this.isRunning = false;
      this.isPaused = true;
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.updateButtons();
      this.updateStatus("Timer paused", "paused");
    }
  }
  stop() {
    this.isPaused = false;
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.currentTime = this.originalTime;
    this.updateDisplay();
    this.updateProgress();
    this.updateButtons();
    this.updateStatus("Timer Stopped", "idle");
  }

  reset() {
    this.stop();
    this.hoursInput.value = 0;
    this.minutesInput.value = 0;
    this.secondsInput.value = 0;
    this.currentTime = 0;
    this.totalTime = 0;
    this.originalTime = 0;
    this.updateDisplay();
    this.updateProgress();
    this.updateStatus("Timer reset", "idle");
  }

  updateInputsFromCurrentTime() {
    const hours = Math.floor(this.currentTime / 3600);
    const minutes = Math.floor((this.currentTime % 3600) / 60);
    const seconds = this.currentTime % 60;
    this.hoursInput.value = hours;
    this.minutesInput.value = minutes;
    this.secondsInput.value = seconds;
  }

  updateDisplay() {
    const hours = Math.floor(this.currentTime / 3600);
    const minutes = Math.floor((this.currentTime % 3600) / 60);
    const seconds = this.currentTime % 60;
    const displayText = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    this.display.textContent = displayText;
  }

  updateProgress() {
    if (this.originalTime > 0) {
      const progress =
        ((this.originalTime - this.currentTime) / this.originalTime) * 100;
      this.progressFill.style.width = `${Math.max(
        0,
        Math.min(100, progress)
      )}%`;
    } else {
      this.progressFill.style.width = "0%";
    }
  }

  updateStatus(message, type) {
    this.status.textContent = message;
    this.status.className = `timer-container__status ${type}`;
  }
  finish() {
    this.isPaused = false;
    this.isRunning = false;
    this.currentTime = 0;
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.updateDisplay();
    this.updateProgress();
    this.updateButtons();
    this.updateStatus("Time's up!", "finished");
  }
  updateButtons() {
    if (this.isRunning) {
      console.log("isRunning", this.startBtn);
      this.startBtn.disabled = true;
      this.pauseBtn.disabled = false;
      this.stopBtn.disabled = false;
      this.resetBtn.disabled = true;
      this.startBtn.textContent = "Start";
      this.pauseBtn.textContent = "Pause";
    } else if (this.isPaused) {
      this.startBtn.disabled = false;
      this.pauseBtn.disabled = true;
      this.stopBtn.disabled = false;
      this.resetBtn.disabled = true;
      this.startBtn.textContent = "Continue";
      this.pauseBtn.textContent = "Pause";
    } else {
      this.startBtn.disabled = false;
      this.pauseBtn.disabled = true;
      this.stopBtn.disabled = true;
      this.resetBtn.disabled = false;
      this.startBtn.textContent = "Start";
      this.pauseBtn.textContent = "Pause";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CountDownTimer();
});
