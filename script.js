const cryptoCurrency = document.getElementById("from");
const currency = document.getElementById("to");
const amount = document.getElementById("amount");
const exchangeResult = document.getElementById("resultexchange");
const button = document.getElementById("button");
const exchangeResult2 = document.getElementById("result");

async function exchangeRate() {
  let from = cryptoCurrency.value;
  let to = currency.value;

  if (from === to) {
    exchangeResult.value = 1;
    exchangeResult2.innerText = `${amount.value} ${from} = ${amount.value} * ${exchangeResult.value} ${to}`;
    exchangeResult2.style.color = "red";
    return;
  }

  console.log(from, to);
  const apiExchangeURL2 = `https://api2.binance.com/api/v3/ticker/24hr`;
  const apiExchangeURL = `https://api.binance.com/api/v3/ticker/price?symbol=${from}${to}`;

  try {
    const response = await fetch(apiExchangeURL);

    const data = await response.json();

    exchangeResult.value = data.price * amount.value;
    exchangeResult2.innerText = `${amount.value} ${from} ≈ ${exchangeResult.value} ${to}`;
    exchangeResult2.style.color = "rgb(47, 208, 248)";
  } catch (error) {
    if (!from || !to || from == " " || to == " ") {
      exchangeResult2.innerHTML = "Error: enter value";
      exchangeResult.value = "Error: enter value";
      exchangeResult2.style.color = "red";
    } else {
      exchangeResult2.innerHTML = "Error: not found";
      exchangeResult2.style.color = "red";
      exchangeResult.value = "Error: not found";
    }
  }
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  exchangeRate();
});
