import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

const companies = {};

class BadCompany {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    whoami() {
        return this.name;
    }
};

app.get('/', (req, res) => {
    res.send("This is my Typescript express application.");
});

app.post('/badcompany', (req, res) => {
    let company = new BadCompany(req.body.company);
    const badness = req.body.badness;
    if (company.whoami() in companies) {
        companies[company.whoami()] += badness;
    } else {
        companies[company.whoami()] = badness;
    }
    console.log(companies);
    console.log(company.whoami());
    res.send(company.whoami());
});

app.get('/badcompany/:company', (req, res) => {
    let theCompany = req.params.company;
    if (theCompany in companies) {
        res.send(`${theCompany} is rated ${companies[theCompany]}`);
    } else {
        res.send(`Could not find ${theCompany}`);
    }
});

app.listen(port, err => {
    if (err) {
        console.error(err);
    }
    return console.log(`HTTP server listening on port ${port}`);
});



