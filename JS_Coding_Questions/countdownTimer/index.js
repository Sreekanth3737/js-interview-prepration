class CountdownTimer {
  constructor() {
    this.totalTime = 0;
    this.currentTime = 0;
    this.originalTime = 0;
    this.intervalId = null;
    this.isRunning = false;
    this.isPaused = false;

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

  bindEvents() {
    this.startBtn.addEventListener("click", () => this.start());
    this.pauseBtn.addEventListener("click", () => this.pause());
    this.stopBtn.addEventListener("click", () => this.stop());
    this.resetBtn.addEventListener("click", () => this.reset());

    // Input validation and real-time update
    [this.hoursInput, this.minutesInput, this.secondsInput].forEach((input) => {
      input.addEventListener("input", (e) => this.handleInputChange(e));
      input.addEventListener("blur", (e) => this.validateInput(e));
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => this.handleKeyPress(e));
  }

  handleInputChange(e) {
    if (!this.isRunning && !this.isPaused) {
      this.validateInput(e);
      this.calculateTime();
      this.updateDisplay();
      this.updateProgress();
    }
  }

  validateInput(e) {
    const input = e.target;
    let value = parseInt(input.value) || 0;
    const min = parseInt(input.min);
    const max = parseInt(input.max);

    // Handle edge cases
    if (value < min) value = min;
    if (value > max) value = max;

    input.value = value;
  }

  handleKeyPress(e) {
    switch (e.key) {
      case " ":
        e.preventDefault();
        if (this.isRunning) {
          this.pause();
        } else if (this.isPaused) {
          this.start();
        } else if (this.currentTime > 0) {
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

  calculateTime() {
    const hours = parseInt(this.hoursInput.value) || 0;
    const minutes = parseInt(this.minutesInput.value) || 0;
    const seconds = parseInt(this.secondsInput.value) || 0;

    this.totalTime = hours * 3600 + minutes * 60 + seconds;
    this.currentTime = this.totalTime;
    this.originalTime = this.totalTime;
  }

  start() {
    // Edge case: No time set
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
    this.isRunning = false;
    this.isPaused = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Reset to original time
    this.currentTime = this.originalTime;
    this.updateDisplay();
    this.updateProgress();
    this.updateButtons();
    this.updateStatus("Timer stopped", "idle");
  }

  reset() {
    this.stop();

    // Reset inputs to default or zero
    this.hoursInput.value = 0;
    this.minutesInput.value = 0;
    this.secondsInput.value = 0;

    this.totalTime = 0;
    this.currentTime = 0;
    this.originalTime = 0;

    this.updateDisplay();
    this.updateProgress();
    this.updateStatus("Timer reset", "idle");
  }

  finish() {
    this.isRunning = false;
    this.isPaused = false;
    this.currentTime = 0;

    clearInterval(this.intervalId);
    this.intervalId = null;

    this.updateDisplay();
    this.updateProgress();
    this.updateButtons();
    this.updateStatus("Time's up!", "finished");

    // Play notification sound (if browser supports it)
    this.playNotification();
  }

  playNotification() {
    try {
      // Create a simple beep sound
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 1
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
      // Fallback: try to show browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Timer Finished!", {
          body: "Your countdown timer has reached zero.",
          icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIHN0cm9rZT0iIzRDQUY1MCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Im0xNS4yIDguOC03Ljc3IDcuNzctMy4zMy0zLjMzIiBzdHJva2U9IiM0Q0FGNTAIIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==",
        });
      }
    }
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

    // Always display in HH:MM:SS format
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

  updateButtons() {
    if (this.isRunning) {
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

  updateStatus(message, type) {
    this.status.textContent = message;
    this.status.className = `status ${type}`;
  }
}

// Initialize the timer when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new CountdownTimer();

  // Request notification permission
  if (
    "Notification" in window &&
    Notification.permission !== "granted" &&
    Notification.permission !== "denied"
  ) {
    Notification.requestPermission();
  }
});
