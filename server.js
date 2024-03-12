const express = require('express');
const app = express();
const PDFDocument = require('pdfkit');
const port = 3000;

let laboratorios = [
{    
    nome:"QuimiNova",
    capacidade: 77,
    descricao: "Desenvolve tecnologias em Nova."
},
{
    nome:"GenTech",
    capacidade: 89,
    descricao: "Desenvolve tecnologias em Tech."
},
{
    nome:"LabGen",
    capacidade: 16,
    descricao: "Desenvolve tecnologias em bGen."
},
{
    nome:"NanoTech",
    capacidade: 87,
    descricao: "Desenvolve tecnologias em Tech."
},
{    
    nome:"BioInova",
    capacidade: 78,
    descricao: "Desenvolve tecnologias em nova."
},
{    
    nome:"VitaLab",
    capacidade: 54,
    descricao: "Desenvolve tecnologias em aLab."
}
];

function verificaHorario(req, res, next){
    console.log("Verificando horário...");
    const data = new Date();
    const hora = data.getHours();
    if(hora >= 8 && hora <= 17){
        console.log("Acesso permitido!");
        next();
    }else{
        console.error("Acesso negado!");
        res.json({"erro":"horario não permitido"});
    }
}

app.use(express.json());
app.use(verificaHorario);

app.get('/laboratorio/todos', (req, res) => {
  console.log(`Enviando dados: ${laboratorios}`);
  res.json(laboratorios);
});

app.post('/laboratorio/novo', (req, res) => {
    console.log(`Dados recebidos: ${req.body}`);
    laboratorios.push({
        nome: req.body.nome, 
        capacidade: req.body.capacidade, 
        descricao: req.body.descricao});
    console.log("Laboratório salvo com sucesso!");
    res.send({menssagem:"Laboratório cadastrado com sucesso!"});
});

app.get('/laboratorio/relatorio', (req, res) => {
    console.log("Gerando relatório...");
    const doc = new PDFDocument();

    res.setHeader('Content-Disposition', 'attachment; filename="relatorio.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
  
    doc.text(JSON.stringify(laboratorios), 50, 50);
  
    console.log("Relatório gerado com sucesso. Enviando resposta...");
    doc.pipe(res);
    doc.end();
    console.log("Relatório enviado!");
  });

  
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
