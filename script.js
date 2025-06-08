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