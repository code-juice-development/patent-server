<h3 align="center">Patent Server</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-deactivated-red.svg)]()

</div>

---

<p align="center"> Servidor para listagem, controle e processamento de patentes
    <br> 
</p>

## 📝 Sumário

- [Sobre](#sobre)
- [Pré Requisitos](#prerequisito)
- [Instalando/Iniciando](#instalando)
- [Autor](#autor)

## 📖 Sobre <a name = "sobre"></a>

O projeto tem como objetivo listar, registrar e controlar o processo de andamento de patentes digitais.

## ✔️ Pré Requisitos <a name = "prerequisito"></a>

Ferramentas necessárias para executar o sistema

```
Yarn 1.22.5^
Node 12.0.0^
Redis 6.0.6^
Postgres 12^
```

## 👨🏻‍💻 Instalando/Iniciando <a name = "instalando"></a>

Depois de clonar o reposítório e configurar o arquivo .env adequadamente, deve ser rodado o comando para criar as migrations:

```
yarn typeorm migration:run
```

Na sequência, o comando para iniciar a fila

```
yarn dev:queue
```

E por ultimo, o comando para iniciar a o server

```
yarn dev:server
```

## ✍️ Authors <a name = "autor"></a>

- [@JeanPoffo](https://github.com/JeanPoffo) - Prototipagem, Desenvolvimento e Deploy
