let adviceID = "";
let adviceQuote = "";
let adviceIDPrepare = "";
let adviceQuotePrepare = "";

const adviceIDText = document.querySelector('#advice-number');
const adviceQuoteText = document.querySelector('#quote');
const quoteButton = document.querySelector('#button');
quoteButton.addEventListener('click', quoteClick);

async function randomAdvice() {
  try {
    quoteButton.disabled = true;
    quoteButton.style.pointerEvents = "none";
    quoteButton.style.background = '#662b91';
    const random = await fetch("https://api.adviceslip.com/advice");
    const adviceGenerated = await random.json();
    adviceIDPrepare = `#${adviceGenerated.slip.id}`;
    adviceIDPrepare = "ADVICE " + adviceIDPrepare;
    adviceQuotePrepare = `"${adviceGenerated.slip.advice}"`;
    while(adviceQuotePrepare.length > 70 || adviceID == adviceIDPrepare) {
      const random = await fetch("https://api.adviceslip.com/advice");
      const adviceGenerated = await random.json();
      adviceIDPrepare = `#${adviceGenerated.slip.id}`;
      adviceIDPrepare = "ADVICE " + adviceIDPrepare;
      adviceQuotePrepare = `"${adviceGenerated.slip.advice}"`;
    } 
    quoteButton.disabled = false;
    quoteButton.style.pointerEvents = "auto";
    quoteButton.style.background = '#A638F6';
  } catch (e) {
    console.log(e);
    quoteButton.disabled = false;
    quoteButton.style.pointerEvents = "auto";
    quoteButton.style.background = '#A638F6';
    adviceIDPrepare = "Error Detected"
    adviceQuotePrepare = "Check your internet connection and try again.";
  }
}

randomAdvice();

async function quoteClick() {
    adviceID = adviceIDPrepare;
    adviceQuote = adviceQuotePrepare;
    adviceIDText.textContent = adviceID;
    adviceQuoteText.textContent = adviceQuote;
    await randomAdvice();
}