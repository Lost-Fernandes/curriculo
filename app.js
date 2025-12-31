const campos = document.querySelectorAll("input, textarea");
campos.forEach(c => c.addEventListener("input", atualizar));

foto.addEventListener("change", () => {
  const reader = new FileReader();
  reader.onload = () => fotoPreview.src = reader.result;
  reader.readAsDataURL(foto.files[0]);
});

function atualizar() {
  nomePreview.innerText = nome.value || "SEU NOME";
  cargoPreview.innerText = cargo.value || "SUA PROFISSÃO";

  enderecoPreview.innerText = "📍 " + endereco.value;
  telefonePreview.innerText = "📞 " + telefone.value;
  emailPreview.innerText = "✉️ " + email.value;
  sitePreview.innerText = "🌐 " + site.value;

  perfilPreview.innerText = perfil.value;
  exp1Preview.innerText = exp1.value;
  exp2Preview.innerText = exp2.value;
  edu1Preview.innerText = edu1.value;
  edu2Preview.innerText = edu2.value;

  skillsPreview.innerHTML = "";
  skills.value.split(",").forEach(skill => {
    if (skill.trim()) {
      const div = document.createElement("div");
      div.className = "skill";
      div.innerHTML = `
        <span>${skill.trim()}</span>
        <div class="barra"><div style="width:${60 + Math.random()*40}%"></div></div>
      `;
      skillsPreview.appendChild(div);
    }
  });
}

async function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  const canvas = await html2canvas(curriculo, { scale: 2 });
  const img = canvas.toDataURL("image/png");

  pdf.addImage(img, "PNG", 10, 10, 190, 0);
  pdf.save("curriculo-profissional.pdf");
}
