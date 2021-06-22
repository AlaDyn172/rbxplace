var Items = [];

const $ = require("jquery-jsdom");
const puppeteer = require("puppeteer");
const url = `https://beta.rbx.place`;


class Scraper {

    constructor(options) {

        this.ordered_by = "DESC";

        if(options.ordered_by)
            if(options.ordered_by == "DESC" || options.ordered_by == "ASC")
                this.ordered_by = options.ordered_by;
            else throw Error(`Optional parameter "ordered_by" can only have a value of 'DESC/ASC'!`);

    }

    /*
    * Load RBX.Place items.
    *
    * @function loadItems
    * @param {number} force - An integer.
    * @param {callback} cb - Callback containing the items.
    * 
    */
    async loadItems(force, cb) {
        let _this = this;
        if(force) return forced();

        if(Items.length > 0) emitItems(_this, (i) => cb(i));
        else forced();

        async function forced() {
            Items = [];
            let req = await makeRequest(url);
            let items = $(req).find(`.Items .Item`);
            items.each((i, itm) => Items.push(formatItem(itm.innerHTML)));
            emitItems(_this, (i) => cb(i));
        }
    }

    /*
    * Get RBX.Place stock.
    *
    * @function getStock
    * @param {callback} cb - Callback containing the stock value.
    * 
    */
    async getStock(cb) {
        let req = await makeRequest(url);
        let stock = $(req).find(".Funds .Text").text();
        cb(stock);
    }
}

function emitItems(t, cb) {
    let itms = [];
    switch(t.ordered_by) {
        case "DESC":
            itms = Items.sort((a,b) => {return a.price-b.price});
            cb(itms);
        break;
        case "ASC":
            itms = Items.sort((a,b) => {return b.price-a.price});
            cb(itms);
        break;
    }
}

async function makeRequest(url) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url, {
      waitUntil: 'load',
      timeout: 0
    }).catch(e => console.error(e));
    let html = await page.content()
    await browser.close();
    return html
  }

function formatItem(props) {
    return {
        name: $(props).find(`.Details .Name`).text(),
        price: parseInt($(props).find(`.Price`).text().replace("$", "")),
        image: $(props).find("img").attr("src"),
        RAP: $(props).find(".RAP").text()
    };
}

module.exports = Scraper;