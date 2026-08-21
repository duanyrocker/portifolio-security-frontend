/* ==========================================
   PROJECT FILTER
========================================== */

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(btn => {
            btn.classList.remove("active");
        });

        filter.classList.add("active");

        const category = filter.dataset.filter;

        projects.forEach(project => {

            if (
                category === "all" ||
                project.dataset.category === category
            ) {

                project.classList.remove("hidden");

            } else {

                project.classList.add("hidden");

            }

        });

    });

});


/* ==========================================
   THEME
========================================== */

const themeToggle =
    document.getElementById("themeToggle");


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const lightMode =
            document.body.classList.contains("light");

        localStorage.setItem(
            "theme",
            lightMode ? "light" : "dark"
        );

    });

}


if (
    localStorage.getItem("theme") === "light"
) {

    document.body.classList.add("light");

}


/* ==========================================
   SECURITY API
========================================== */

const analyzeBtn =
    document.getElementById("analyzeBtn");

const domainInput =
    document.getElementById("domainInput");

const apiResult =
    document.getElementById("apiResult");


const API_URL =
    "http://127.0.0.1:8000";


if (analyzeBtn && domainInput) {

    analyzeBtn.addEventListener(
        "click",
        analyzeDomain
    );


    domainInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                analyzeDomain();

            }

        }
    );

}


async function analyzeDomain() {

    let domain =
        domainInput.value.trim();


    if (!domain) {

        showApiError(
            "Digite um domínio para iniciar a análise."
        );

        return;

    }


    domain = domain.trim();


    analyzeBtn.disabled = true;

    analyzeBtn.textContent =
        "ANALISANDO...";


    apiResult.innerHTML = `

        <div>

            <span class="green">
                &gt; iniciando análise...
            </span>

            <br><br>

            <span class="muted">
                target: ${escapeHtml(domain)}
            </span>

            <br>

            <span class="muted">
                consultando Security API...
            </span>

        </div>

    `;


    try {

        const response =
            await fetch(
                `${API_URL}/analyze`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        domain: domain
                    })

                }
            );


        if (!response.ok) {

            let errorMessage =
                "Não foi possível analisar o domínio.";


            try {

                const errorData =
                    await response.json();


                if (errorData.detail) {

                    errorMessage =
                        errorData.detail;

                }

            } catch (error) {}


            throw new Error(
                errorMessage
            );

        }


        const data =
            await response.json();


        showApiResult(data);


    } catch (error) {

        console.error(
            "Security API error:",
            error
        );


        showApiError(
            error.message ||
            "Erro ao conectar com a Security API."
        );


    } finally {

        analyzeBtn.disabled = false;

        analyzeBtn.textContent =
            "EXECUTAR";

    }

}


function showApiResult(data) {

    const headers =
        data.security_headers || {};


    const totalHeaders =
        Object.keys(headers).length;


    const activeHeaders =
        Object.values(headers)
            .filter(Boolean)
            .length;


    const httpsStatus =
        data.https
            ? `<span class="green">✓ ENABLED</span>`
            : `<span class="danger">✕ DISABLED</span>`;


    const statusClass =
        data.status_code >= 200 &&
        data.status_code < 400
            ? "green"
            : "danger";


    let riskLevel;
    let riskClass;


    if (data.score >= 80) {

        riskLevel = "LOW";
        riskClass = "green";

    } else if (data.score >= 50) {

        riskLevel = "MEDIUM";
        riskClass = "warning";

    } else {

        riskLevel = "HIGH";
        riskClass = "danger";

    }


    apiResult.innerHTML = `

        <div>

            <span class="green">
                &gt; ANALYSIS COMPLETE
            </span>

            <span class="muted">
                ${escapeHtml(data.domain)}
            </span>

        </div>


        <br>


        <div>

            <span class="result-label">
                TARGET
            </span>

            <strong>
                ${escapeHtml(data.domain)}
            </strong>

        </div>


        <br>


        <div>

            <span class="result-label">
                HTTP STATUS
            </span>

            <strong class="${statusClass}">
                ${data.status_code}
            </strong>

        </div>


        <br>


        <div>

            <span class="result-label">
                HTTPS
            </span>

            <strong>
                ${httpsStatus}
            </strong>

        </div>


        <br>


        <div>

            <span class="result-label">
                SECURITY HEADERS
            </span>

            <strong>
                ${activeHeaders}/${totalHeaders}
            </strong>

        </div>


        <br>


        <div>

            <span class="result-label">
                RISK LEVEL
            </span>

            <strong class="${riskClass}">
                ${riskLevel}
            </strong>

        </div>


        <br>


        <div>

            <span class="result-label">
                SECURITY SCORE
            </span>

            <strong class="${riskClass}">
                ${data.score}/100
            </strong>

        </div>


        <br><br>


        <div>

            <span class="result-label">
                SECURITY HEADERS
            </span>


            <div class="headers-list">

                ${createHeaderResult(
                    "HSTS",
                    headers["HSTS"]
                )}

                ${createHeaderResult(
                    "CSP",
                    headers["CSP"]
                )}

                ${createHeaderResult(
                    "X-Frame-Options",
                    headers["X-Frame-Options"]
                )}

                ${createHeaderResult(
                    "X-Content-Type-Options",
                    headers["X-Content-Type-Options"]
                )}

                ${createHeaderResult(
                    "Referrer-Policy",
                    headers["Referrer-Policy"]
                )}

                ${createHeaderResult(
                    "Permissions-Policy",
                    headers["Permissions-Policy"]
                )}

            </div>

        </div>

    `;

}


function createHeaderResult(
    name,
    enabled
) {

    if (enabled) {

        return `

            <div>

                <span>
                    ${name}
                </span>

                <span class="green">
                    ✓
                </span>

            </div>

        `;

    }


    return `

        <div>

            <span>
                ${name}
            </span>

            <span class="danger">
                ✕
            </span>

        </div>

    `;

}


function showApiError(message) {

    apiResult.innerHTML = `

        <div>

            <span class="danger">
                &gt; ERROR
            </span>

            <br><br>

            <span>
                ${escapeHtml(message)}
            </span>

            <br><br>

            <span class="muted">
                Verifique se a Security API está
                executando em ${API_URL}
            </span>

        </div>

    `;

}


function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* ==========================================
   HERO TERMINAL
========================================== */

const heroTerminalInput =
    document.getElementById(
        "heroTerminalInput"
    );


const heroTerminalOutput =
    document.getElementById(
        "heroTerminalOutput"
    );


if (heroTerminalInput) {

    heroTerminalInput.focus();

}


/* ==========================================
   TERMINAL INPUT
========================================== */

if (heroTerminalInput) {

    heroTerminalInput.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Enter") {
                return;
            }


            const command =
                heroTerminalInput.value
                    .trim()
                    .toLowerCase();


            heroTerminalInput.value = "";


            if (!command) {
                return;
            }


            const commandLine =
                document.createElement("div");


            commandLine.innerHTML = `

                <div>

                    <span class="terminal-pink">
                        duany@security
                    </span>:~$

                    ${escapeHtml(command)}

                </div>

            `;


            heroTerminalOutput.appendChild(
                commandLine
            );


            executeTerminalCommand(command);

        }
    );

}


/* ==========================================
   TERMINAL COMMANDS
========================================== */

function executeTerminalCommand(command) {

    let response = "";


    switch (command) {


        case "help":

            response = `

                <div class="terminal-command">

                    <span class="terminal-pink">
                        comandos disponíveis:
                    </span>

                    <br><br>

                    <strong>help</strong>
                    → mostra os comandos

                    <br>

                    <strong>about</strong>
                    → sobre mim

                    <br>

                    <strong>projects</strong>
                    → projetos

                    <br>

                    <strong>skills</strong>
                    → tecnologias

                    <br>

                    <strong>api</strong>
                    → Security API

                    <br>

                    <strong>clear</strong>
                    → limpar terminal

                </div>

            `;

            break;


        case "about":

            response = `

                <div class="terminal-command">

                    <span class="terminal-pink">
                        > ABOUT
                    </span>

                    <br><br>

                    Analista de Segurança em formação.

                    <br>

                    Foco:
                    Cibersegurança,
                    Web Security e DevSecOps.

                </div>

            `;

            break;


        case "projects":

            response = `

                <div class="terminal-command">

                    <span class="terminal-pink">
                        > PROJECTS
                    </span>

                    <br><br>

                    [01] SIEM & Threat Detection

                    <br>

                    [02] Secure CI/CD Pipeline

                    <br>

                    [03] Network Security Lab

                    <br>

                    [04] Security Toolkit

                    <br>

                    [05] Web Security Labs

                    <br>

                    [06] Security API

                </div>

            `;

            break;


        case "skills":

            response = `

                <div class="terminal-command">

                    <span class="terminal-pink">
                        > SKILLS
                    </span>

                    <br><br>

                    Python · Linux · Burp Suite · Wazuh

                    <br>

                    Suricata · Nmap · Wireshark · Docker

                </div>

            `;

            break;


        case "api":

            response = `

                <div class="terminal-command">

                    <span class="terminal-pink">
                        > SECURITY API
                    </span>

                    <br><br>

                    Security API v1.0

                    <br><br>

                    Endpoint:

                    <span class="terminal-pink">
                        POST /analyze
                    </span>

                    <br><br>

                    Status:

                    <span class="terminal-pink">
                        ONLINE
                    </span>

                </div>

            `;

            break;


        case "clear":

            heroTerminalOutput.innerHTML = "";

            return;


        default:

            response = `

                <div class="terminal-command">

                    comando

                    <span class="terminal-pink">
                        "${escapeHtml(command)}"
                    </span>

                    não encontrado.

                    <br><br>

                    Digite

                    <span class="terminal-pink">
                        help
                    </span>

                    para ver os comandos disponíveis.

                </div>

            `;

    }


    const responseElement =
        document.createElement("div");


    responseElement.innerHTML =
        response;


    heroTerminalOutput.appendChild(
        responseElement
    );


    heroTerminalOutput.scrollTop =
        heroTerminalOutput.scrollHeight;

}