class Stopwatch {
  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.intervelId = null;
    this.isRunning = false;
    this.isPaused = false;

    this.initializeElements();
    this.bindEvents();
    this.updateDisplay();
  }
  initializeElements() {
    this.mainDisplay = document.getElementById("mainDisplay");
    this.millisecondDisplay = document.getElementById("millisecondDisplay");
    this.startBtn = document.getElementById("startBtn");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.resetBtn = document.getElementById("resetBtn");
    this.status = document.getElementById("status");
    this.elapsedInfo = document.getElementById("elapsedInfo");
    this.totalElapsedInfo = document.getElementById("totalElapsed");
  }

  bindEvents() {
    this.startBtn.addEventListener("click", () => this.start());
    this.pauseBtn.addEventListener("click", () => this.pause());
    this.resetBtn.addEventListener("click", () => this.reset());

    document.addEventListener("keydown", (e) => this.handleKeyPress(e));
  }

  start() {
    if (!this.isPaused) {
      this.startTime = Date.now();
    } else {
      this.startTime = Date.now() - this.elapsedTime;
    }
    this.isRunning = true;
    this.isPaused = false;
    this.updateButtons();
    this.updateStatus("Stopwatch running...", "running");
    this.showElapsedTime();

    this.intervelId = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.updateDisplay();
    }, 10);
  }
  pause() {
    if (this.isRunning) {
      this.isRunning = false;
      this.isPaused = true;
      clearInterval(this.intervelId);
      this.intervelId = null;
      this.updateButtons();
      this.updateStatus("Stopwatch paused", "paused");
    }
  }
  reset() {
    this.isPaused = false;
    this.isRunning = false;
    this.elapsedTime = 0;
    this.startTime = 0;

    if (this.intervelId) {
      clearInterval(this.intervelId);
      this.intervelId = null;
    }
    this.updateButtons();
    this.updateDisplay();
    this.updateStatus("Ready to start", "idle");
    this.hideElapsedInfo();
  }
  handleKeyPress(e) {}
  updateButtons() {
    if (this.isRunning) {
      this.startBtn.disabled = true;
      this.pauseBtn.disabled = false;
      this.resetBtn.disabled = true;
      this.startBtn.textContent = "Start";
    } else if (this.isPaused) {
      this.startBtn.disabled = false;
      this.pauseBtn.disabled = true;
      this.resetBtn.disabled = false;
      this.startBtn.textContent = "Resume";
    } else {
      this.startBtn.disabled = false;
      this.pauseBtn.disabled = true;
      this.resetBtn.disabled = false;
      this.startBtn.textContent = "Start";
    }
  }
  updateDisplay() {
    const time = this.formatTime(this.elapsedTime, true);
    this.mainDisplay.textContent = time.main;
    this.millisecondDisplay.textContent = time.ms;

    this.totalElapsedInfo.textContent = this.formatTime(
      this.elapsedTime,
      false
    );
  }
  formatTime(milliseconds, split = false) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const ms = milliseconds % 1000;
    const main = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (split) {
      return {
        main,
        ms: ms.toString().padStart(3, "0"),
      };
    }
    return `${main}.${ms.toString().padStart(3, "0")}`;
  }
  updateStatus(message, type) {
    this.status.textContent = message;
    this.status.className = `stopwatch-container__status ${type}`;
  }
  showElapsedTime() {
    this.elapsedInfo.style.display = "block";
  }
  hideElapsedInfo() {
    this.elapsedInfo.style.display = "none";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new Stopwatch();
});
