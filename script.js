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

const apiKey = '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'; // <--- Replace this with YOUR real API key

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
botMsg.innerText = data.choices?.[0]?.message?.content || "Something went wrong.";
messages.scrollTop = messages.scrollHeight;
}
}