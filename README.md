# 🛡️ Security Portfolio

Frontend do meu portfólio profissional, desenvolvido para apresentar minha trajetória, projetos práticos e estudos em **Segurança da Informação, Cibersegurança, Desenvolvimento e DevSecOps**.

O projeto foi construído do zero utilizando **HTML, CSS e JavaScript**, com uma interface inspirada em ambientes de segurança e terminais de sistemas.

🌐 **Acesse o portfólio:**
https://duanyrocker.github.io/portifolio-security-frontend/

---

## 🎯 Sobre o projeto

O portfólio foi desenvolvido para reunir em um único ambiente minha experiência e evolução técnica na área de tecnologia e segurança.

A proposta é apresentar não apenas conhecimentos teóricos, mas principalmente **projetos práticos, laboratórios e ferramentas desenvolvidas durante meus estudos**.

Entre os temas apresentados estão:

* Segurança Web
* Análise de vulnerabilidades
* Segurança de redes
* Monitoramento e detecção
* DevSecOps
* Desenvolvimento em Python
* APIs
* Infraestrutura e Linux

---

## ⚡ Funcionalidades

* Interface responsiva
* Tema claro e escuro
* Filtro de projetos por categoria
* Terminal visual interativo
* Seção de projetos e laboratórios
* Stack tecnológica
* Linha do tempo de formação e evolução
* Links para os projetos no GitHub
* Integração com Security API
* Análise de domínios diretamente pela interface

---

## 🔐 Security API

O portfólio possui uma ferramenta integrada desenvolvida para demonstrar a utilização de uma **API de segurança própria**.

O usuário informa um domínio e a interface envia a solicitação para o backend, retornando os resultados diretamente no portfólio.

```text
┌───────────────────────┐
│       Portfolio       │
│     HTML / CSS / JS   │
└───────────┬───────────┘
            │
            │ POST /analyze
            ▼
┌───────────────────────┐
│     Security API      │
│        FastAPI        │
└───────────┬───────────┘
            │
            │ JSON
            ▼
┌───────────────────────┐
│     Security Results  │
│      Interface Web    │
└───────────────────────┘
```

O frontend e a API são mantidos em **repositórios separados**.

---

## 🛠️ Tecnologias

### Frontend

* HTML5
* CSS3
* JavaScript
* Git
* GitHub Pages

### Integração

* REST API
* HTTP
* JSON
* CORS

---

## 📂 Estrutura do projeto

```text
portifolio-security-frontend/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── images/
│   └── icons/
│
└── README.md
```

### Principais arquivos

| Arquivo      | Descrição                                  |
| ------------ | ------------------------------------------ |
| `index.html` | Estrutura e conteúdo do portfólio          |
| `style.css`  | Estilos, layout, temas e responsividade    |
| `script.js`  | Interações, filtros e integração com a API |
| `assets/`    | Imagens e recursos utilizados pelo projeto |

---

## 🚀 Executando localmente

Clone o repositório:

```bash
git clone https://github.com/duanyrocker/portifolio-security-frontend.git
```

Entre no diretório:

```bash
cd portifolio-security-frontend
```

Como o projeto utiliza HTML, CSS e JavaScript puro, não existem dependências obrigatórias para instalar.

Você pode abrir o `index.html` diretamente no navegador ou utilizar uma extensão como **Live Server** no VS Code.

---

## 🔌 Configuração da Security API

A integração com a API é configurada no JavaScript através da URL do backend.

Exemplo:

```javascript
const API_URL = "http://127.0.0.1:8000";
```

Para utilizar a funcionalidade de análise localmente, execute também o repositório da **Security API**.

Caso a API esteja hospedada em outro endereço, altere a URL utilizada pelo frontend.

---

## 📱 Responsividade

O layout foi desenvolvido para diferentes tamanhos de tela:

* 🖥️ Desktop
* 💻 Notebook
* 📱 Mobile
* 📟 Tablet

---

## 🧩 Projetos apresentados

O portfólio reúne projetos e estudos práticos em diferentes áreas:

**Security**

* SIEM & Threat Detection
* Web Security Labs

**DevSecOps**

* Secure CI/CD Pipeline

**Network**

* Network Monitor

**Python**

* Security Toolkit

**API**

* Security API

Os projetos possuem seus próprios repositórios e documentação.

---

## 📚 Stack

### Security

`Burp Suite` · `Wazuh` · `Suricata` · `Nmap` · `Wireshark` · `OWASP`

### Development

`Python` · `JavaScript` · `HTML` · `CSS` · `Node.js`

### Infrastructure

`Linux` · `Docker` · `Git` · `GitLab CI/CD`

---

## 📌 Status

**Em desenvolvimento contínuo.**

O portfólio será atualizado conforme novos projetos, laboratórios e experiências forem adicionados.

---

## 👩‍💻 Autora

**Duany Rocker**

Profissional de Segurança da Informação com base em desenvolvimento, infraestrutura e redes.

Atualmente, o foco está em **segurança web, análise de vulnerabilidades, monitoramento, detecção de ameaças e DevSecOps**.

> *Explorar sistemas para entender como funcionam, como podem ser explorados e, principalmente, como podem ser protegidos.*

---

⭐ Desenvolvido para demonstrar, na prática, minha evolução em tecnologia e segurança.

