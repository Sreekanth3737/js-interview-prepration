// normal queue
class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
  }
  dequeue() {
    if (this.isEmpty()) {
      return "queue is empty";
    }
    return this.queue.shift();
  }
  isEmpty() {
    return this.size() === 0;
  }
  peek() {
    return this.queue[0];
  }
  printQueue() {
    console.log(this.queue.join(","));
  }
  size() {
    return this.queue.length;
  }
}

const myQueue = new Queue();
myQueue.enqueue(5);
myQueue.enqueue(6);
myQueue.enqueue(7);

console.log(
  myQueue.peek(),
  myQueue.size(),
  myQueue.isEmpty(),
  myQueue.dequeue()
);

myQueue.printQueue();

// Circular Queue
class CircularQueue {
  constructor(size) {
    this.queue = new Array(size);
    this.size = size;
    this.rear = -1;
    this.front = -1;
  }
  isEmpty() {
    return this.front === -1;
  }
  isFull() {
    return (
      (this.front === 0 && this.rear === this.size - 1) ||
      this.rear === (this.front - 1 + this.size) % this.size
    );
  }
  enqueue(element) {
    if (this.isFull()) {
      console.log("queue is full");
      return;
    }
    if (this.isEmpty()) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.rear = (this.rear + 1) % this.size;
    }
    this.queue[this.rear] = element;
    console.log(
      `${element} element ${(this.rear, this.front)} enqueued to the queue`
    );
  }

  dequeue() {
    let item;
    if (this.isEmpty()) {
      console.log("queue is empty");
      return;
    }
    if (this.rear === this.front) {
      item = this.queue[this.front];
      this.front = -1;
      this.rear = -1;
    } else {
      item = this.queue[this.front];
      this.front = (this.front + 1) % this.size;
    }
    console.log(`${item} dequeued from the queue`);
    return item;
  }
  getFront() {
    if (this.isEmpty()) {
      console.log("queue is empty");
      return;
    }
    console.log(`Front: ${this.queue[this.front]}`);
  }
  getRear() {
    if (this.isEmpty()) {
      console.log("queue is empty");
      return;
    }
    console.log(`Rear: ${this.queue[this.rear]}`);
  }
  displayCircularQueue() {
    if (this.isEmpty()) {
      console.log("queue is empty");
      return;
    }
    let i = this.front;

    while (true) {
      console.log(this.queue[i]); // Print the current element
      if (i === this.rear) break; // Stop when we reach the rear
      i = (i + 1) % this.size; // Move to the next index, wrapping around if necessary
    }
  }
}
const myCircularQueue = new CircularQueue(5);
myCircularQueue.enqueue(1);
myCircularQueue.enqueue(2);
myCircularQueue.enqueue(3);
myCircularQueue.enqueue(4);
myCircularQueue.enqueue(5);
myCircularQueue.displayCircularQueue();
myCircularQueue.enqueue(6);
myCircularQueue.displayCircularQueue();
myCircularQueue.getFront();
myCircularQueue.getRear();
myCircularQueue.dequeue();
myCircularQueue.displayCircularQueue();
myCircularQueue.getFront();
myCircularQueue.getRear();
