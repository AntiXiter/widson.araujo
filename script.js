document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".cabeçalho nav ul li a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        });
    });
});

const projectList = document.querySelector(".projetos-lista");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let isAnimating = false;

function updateCarousel(direction) {
    if (isAnimating) return;
    isAnimating = true;

    if (direction === "next") {
        projectList.style.transition = "transform 0.5s ease-in-out";
        projectList.style.transform = "translateX(-310px)"; // Move para a esquerda (ajuste conforme o tamanho do card)

        setTimeout(() => {
            let firstProject = projectList.firstElementChild;
            projectList.appendChild(firstProject); // Move o primeiro para o final
            projectList.style.transition = "none";
            projectList.style.transform = "translateX(0)"; // Reseta posição instantaneamente
            isAnimating = false;
        }, 500); // Tempo da animação
    } else {
        let lastProject = projectList.lastElementChild;
        projectList.style.transition = "none";
        projectList.style.transform = "translateX(-310px)"; // Posiciona o último à esquerda instantaneamente
        projectList.insertBefore(lastProject, projectList.firstElementChild);

        setTimeout(() => {
            projectList.style.transition = "transform 0.5s ease-in-out";
            projectList.style.transform = "translateX(0)"; // Move suavemente de volta
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        });
    }
}

// Eventos de clique
nextBtn.addEventListener("click", () => updateCarousel("next"));
prevBtn.addEventListener("click", () => updateCarousel("prev"));
