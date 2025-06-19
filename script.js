// smaller balls
document.addEventListener('scroll', () => {
const scrollY = window.scrollY;
const balls = document.querySelectorAll('.ball');

balls.forEach((ball, index) => {
const movement = (index % 2 === 0 ? 1 : -1) * (scrollY * 0.1);
ball.style.transform = `translateX(${movement}px)`;
});
});

// main blob

document.addEventListener("scroll", () => {
const scrollY = window.scrollY;
const foregroundBalls = document.querySelectorAll(".ball.front");
const backgroundBalls = document.querySelectorAll(".ball.back");

foregroundBalls.forEach(ball => {
ball.style.transform = `translateY(${scrollY * 0.2}px)`;
});

backgroundBalls.forEach(ball => {
ball.style.transform = `translateY(${scrollY * 0.05}px)`;
});
});

// end of section

// charts for crypto
async function fetchChartData(coinId, canvasId, label) {
try {
const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`);
const data = await res.json();

const prices = data.prices.map(p => p[1]);
const times = data.prices.map(p => {
const date = new Date(p[0]);
return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
});

const ctx = document.getElementById(canvasId).getContext('2d');
new Chart(ctx, {
type: 'line',
data: {
labels: times,
datasets: [{
label: label,
data: prices,
borderColor: '#c2aaff',
borderWidth: 2,
fill: false,
tension: 0.3
}]
},
options: {
plugins: {
legend: {
labels: {
color: 'white'
}
}
},
scales: {
x: {
ticks: { color: '#bbb' },
title: {
display: true,
text: 'Time',
color: '#aaa'
}
},
y: {
ticks: { color: '#bbb' },
title: {
display: true,
text: 'USD',
color: '#aaa'
}
}
}
}
});
} catch (err) {
console.error(`Error loading chart for ${label}:`, err);
}
}

async function updateLivePrices() {
const coins = ['bitcoin', 'bitcoin-cash', 'bittensor'];
const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`);
const data = await res.json();

const html = `
<span>BTC: $${data.bitcoin.usd}</span>
<span>BCH: $${data["bitcoin-cash"].usd}</span>
<span>TAO: $${data.bittensor.usd}</span>
`;
document.getElementById('priceTracker').innerHTML = html;
}

window.onload = function () {
fetchChartData('bitcoin', 'btcChart', 'BTC Price');
fetchChartData('bitcoin-cash', 'bchChart', 'BCH Price');
fetchChartData('bittensor', 'taoChart', 'TAO Price');
updateLivePrices();
setInterval(updateLivePrices, 60000); // refresh every 60 seconds
};









// footer
const dateElem = document.getElementById("datetime");
function updateClock() {
const now = new Date();
dateElem.textContent = now.toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();


// LLM
async function handleInput(e) {
if (e.key === 'Enter') {
const input = document.getElementById('forge-input');
const messages = document.getElementById('forge-messages');
const userText = input.value.trim();
if (!userText) return;

// Show user message
const userMsg = document.createElement('div');
userMsg.className = 'forge-user';
userMsg.innerText = userText;
messages.appendChild(userMsg);
input.value = '';
messages.scrollTop = messages.scrollHeight;

// Show loading
const botMsg = document.createElement('div');
botMsg.className = 'forge-bot';
botMsg.innerText = 'Processing...';
messages.appendChild(botMsg);
messages.scrollTop = messages.scrollHeight;

// Call GPT-4 API
const payload = {
model: "gpt-4",
messages: [
{
role: "system",
content: `You are Forge AI, the assistant for Desert Forged Technologies.
You are a helpful, humble AI that learns more about the company and clients each day to become more useful.
You can guide users around the site, explain services clearly, and even recommend other legitimate companies if we’re not the right fit.
Be professional but friendly. You can also answer general tech and frontend questions.`
},
{ role: "user", content: userText }
]
};

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${apiKey}`
},
body: JSON.stringify(payload)
});

const data = await response.json();
botMsg.innerText = data.choices?.[0]?.message?.content || "We just got sponsored by META! We are updating our LLM as quick as possible. This Feature is COMING SOON!.";
messages.scrollTop = messages.scrollHeight;
}
}

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 30; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    len: Math.random() * 80 + 10,
    speed: Math.random() * 3 + 2,
    alpha: Math.random() * 0.5 + 0.3
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    ctx.beginPath();
    let grad = ctx.createLinearGradient(star.x, star.y, star.x + star.len, star.y + star.len);
    grad.addColorStop(0, `rgba(0,255,204,${star.alpha})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.strokeStyle = grad;
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x + star.len, star.y + star.len);
    ctx.stroke();

    star.x += star.speed;
    star.y += star.speed;

    if (star.x > canvas.width || star.y > canvas.height) {
      star.x = Math.random() * -100;
      star.y = Math.random() * canvas.height;
    }
  }
  requestAnimationFrame(drawStars);
}

drawStars();

