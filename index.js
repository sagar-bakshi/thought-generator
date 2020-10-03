const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('qoute-author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function showLoading(){
    loader.hidden = false
    quoteContainer.hidden = true;
}

function removeLoading() {
    if (!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}


//get quote from api
async function getQuote() {
        showLoading();
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    try{
        const response = await fetch(proxyurl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor){
            authorText.innerText = data.quoteAuthor;
        }else {
            authorText.innerText = 'unknown'
        }

        quoteText.innerText = data.quoteText;
        removeLoading();
    }catch (error){
        // //onLoad
        console.log(error);
    }
}




//tweet qoute
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//event listner
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//onLoad
// getQuote();
