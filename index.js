const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //IMPORTAR O BODY PARSER
//DATABASE
const connection = require("./database/database");
//MODEL
const Ask = require("./database/Ask");

const Answer = require("./database/Answer");

//Autenticação
connection
  .authenticate()
  .then(() => {
    console.log("Connection made to database");
  })
  .catch((error) => {
    console.log("error");
  });

// Estou dizendo para o EXPRESS que desejo utilizar o EJS como View Engine, sendo necessário criar a pasta VIEW
app.set("view engine", "ejs");

app.use(express.static("public")); //VAI FICAR OS ARQUIVOS STATICOS, ESSE FOI O APONTAMENTO, TEM CRIAR A PASTA
//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false })); //VAI DECODIFICAR O DADOS ENVIADOS PELO FORMULARIO
app.use(bodyParser.json()); // DADOS FORMULÁRIOS VIA JSON

//ROUTES
app.get("/", (req, res) => {
  Ask.findAll({
    raw: true,
    order: [
      ["id", "DESC"], //ORDENANDO  POR ID  DE FORMA DECRESCENTE
    ],
  }).then((questions) => {
    //raw, pesquisa crua
    res.render("index", {
      //ENVIANDO PARA O FRONT
      questions: questions,
    });
  });
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/savequestion", (req, res) => {
  let title = req.body.title;

  let description = req.body.description;

  Ask.create({
    title: title,
    description: description,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(`${error}Error sending data, please try again!`);
    });
});

app.get("/question/:id", (req, res) => {
  var id = req.params.id;
  Ask.findOne({
    where: { id: id },
  }).then((question) => {
    if (question != undefined) {
      //PERGUNTA ENCONTRADA

      Answer.findAll({
        where: { questionId: question.id },
        order: [["id", "DESC"]],
      }).then((answers) => {
        res.render("question", {
          question: question,
          answers: answers,
        });
      });
    } else {
      //PERGUNTA NÃO ECONTRADA

      res.redirect("/");
    }
  });
});

app.post("/answer", (req, res) => {
  var questionBody = req.body.questionBody;

  var questionId = req.body.question;

  Answer.create({
    questionBody: questionBody,
    questionId: questionId,
  }).then(() => {
    res.redirect(`/question/${questionId}`);
  });
});

app.listen(8080, () => {
  console.log("Application running");
});
